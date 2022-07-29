import {
    sendTicketStart,
    sendTicketSuccess,
    sendTicketError,
    getTicketsStart,
    getTicketsSuccess,
    getTicketsError,
    changeTicketStatusStart,
    changeTicketStatusSuccess,
    changeTicketStatusError,
    removeUserTicketsStart,
    removeUserTicketsSuccess,
    removeUserTicketsError,
} from './actions'

export const sendTicket = (ticket, uid) => async (dispatch, _, api) => {
    try {
        dispatch(sendTicketStart());

        await api.sendTicketToFirebaseApi(ticket, uid);
        // const getProfileFromDB = await api.getProfileFromFirebaseApi(uid);
        // console.log("getProfileFromDB.val()", getProfileFromDB)
        // const {firstName, middleName, lastName, dept, isAdmin, avatar} = getProfileFromDB.val();
        //
        // const profile = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     middleName: middleName,
        //     avatar: avatar,
        //     dept: dept,
        //     isAdmin: isAdmin
        // }

        // dispatch(sendTicketSuccess(ticket, ticketCount))
    } catch (e) {
        dispatch(sendTicketError(e));
    }
}

// isAdmin - флаг обозначающий роль пользователя (админ - true, пользователь - false).
// uid - UID пользователя, передается в api чтобы обратиться только к своей ноде в firebase.
export const getTickets = (uid, isAdmin = false) => async (dispatch, _, api) => {
    try {
        dispatch(getTicketsStart());
        const tickets = [];

        const decreaseSort = () => {

        }
        // debugger
        const snap = await api.getTicketsFromFirebaseApi(uid, isAdmin).then(data => data.val()); // Приходит объект вида { dsaf: {}, fdsf: {} }

        for (let el in snap) {      // В el приходит значение свойства uid
            if (snap.hasOwnProperty(el)) {  //Проверяем есть ли такое свойство в объекте snap
                if (isAdmin) { //Проверяем адимн ли это
                    for (let subEl in snap[el]) {   // В subEl приходит значение свойства date
                        // console.log("SUBEL", snap[el][subEl])
                        if (snap[el].hasOwnProperty(subEl)) { //Проверяем есть ли такое свойство в объекте snap[el]
                            tickets.push(snap[el][subEl]);  //Пушим в массив содержимое свойства subEl объекта snap[el]
                        }
                    }
                } else { // если не админ, то просто пушим в массив значение свойства объекта snap[el]
                    tickets.push(snap[el]);
                }
            }
        }

        // Пызырьковая сортировка массива
        tickets.sort((a, b) => {
            if (a.ticketDate > b.ticketDate) {
                return -1;
            }
            if (a.ticketDate < b.ticketDate) {
                return 1;
            }
            return 0
        })
        dispatch(getTicketsSuccess(tickets)); // Передаемм tickets, который имеет вид [{},{}]
        console.log("tickets", tickets)
        // if (!isAdmin) {
        //     const snap = await api.getTicketsFromFirebaseApi(uid, !isAdmin).then(data => data.val()); // Приходит объект вида { dsaf: {}, fdsf: {} }
        //     console.log("GET SNAP", snap)
        //     for (let el in snap) {
        //         // debugger
        //         if (snap.hasOwnProperty(el)) {
        //             for (let elem in snap[el]) {
        //                 if(snap[el].hasOwnProperty(elem)){
        //                     tickets.push(snap[el][elem]);
        //                 }
        //             }
        //             // tickets.push(snap[el]);
        //         }
        //     }
        //     tickets.sort((a, b) => {
        //         if (a.ticketDate > b.ticketDate) {
        //             return -1;
        //         }
        //         if (a.ticketDate < b.ticketDate){
        //             return 1;
        //         }
        //         return 0
        //     })
        //     dispatch(getTicketsSuccess(tickets));
        // } else {
        //     const snap = await api.getTicketsFromFirebaseApi(uid, isAdmin).then(data => data.val());    // Приходит объект вида { uid: { date: {}, date: {} }, uid: { date: {}, date: {} } }
        //     console.log("GET SNAP", snap)
        //     for (let el in snap) {      // В el приходит значение свойства uid
        //         if (snap.hasOwnProperty(el)) {  //Проверяем есть ли такое свойство в объекте snap
        //             for (let subEl in snap[el]) {   // В subEl приходит значение свойства date
        //                 // console.log("SUBEL", snap[el][subEl])
        //                 if(snap[el].hasOwnProperty(subEl)){ //Проверяем есть ли такое свойство в объекте snap[el]
        //                     tickets.push(snap[el][subEl]);  //Пушим в массив содержимое свойства subEl объекта snap[el]
        //                 }
        //             }
        //         }
        //     }
        //
        //     // Пызырьковая сортировка массива
        //     tickets.sort((a, b) => {
        //         if (a.ticketDate > b.ticketDate) {
        //             return -1;
        //         }
        //         if (a.ticketDate < b.ticketDate){
        //             return 1;
        //         }
        //         return 0
        //     })
        //     dispatch(getTicketsSuccess(tickets)); // Передаемм tickets, который имеет вид [{},{}]
        // }
    } catch (e) {
        console.log("SOME WRONG")
        dispatch(getTicketsError(e))
    }
}
/**
 * Функция изменения статуса тикета
 * @param ticket Тикет пользователя
 * @param isAdmin пользователь админгистратор или нет
 * @returns {(function(*, *, *): Promise<void>)|*}
 */
// export const changeTicketStatus = (ticket, fio ,uid ) => async (dispatch, _, api) => {
export const changeTicketStatus = (ticket, uid, isAdmin) => async (dispatch, _, api) => {
    try {
        dispatch(changeTicketStatusStart());

        let userUid = null;
        if (isAdmin) { //проверям админ ли это
            // получаем тикеты пользователей чтобы райти uid
            const snap = await api.getTicketsFromFirebaseApi(uid, isAdmin).then(data => data.val()); // Приходит объект вида { dsaf: {}, fdsf: {} }
            for (let el in snap) {      // В el приходит значение свойства uid
                if (snap.hasOwnProperty(el)) {  //Проверяем есть ли такое свойство в объекте snap
                    for (let subEl in snap[el]) {   // В subEl приходит значение свойства date
                        if (snap[el].hasOwnProperty(subEl) && subEl == ticket.ticketDate) { //Проверяем есть ли такое свойство в объекте snap[el]
                            //и соотвествует ли тикет в массиве тикету из приложения
                            userUid = el // если да, то записываем uid пользователя
                        }
                    }
                }
            }
        } else {
            userUid = uid
        }

        console.log('санк уид из тикетов', userUid)

        await api.changeTicketStatusToFirebaseApi(ticket, userUid);
        console.log('тикет санк', ticket)
        // console.log('fio санк', fio)
        // console.log('uid санк', uid)


        dispatch(changeTicketStatusSuccess(ticket))

        // dispatch(changeTicketStatusSuccess(ticket, fio))
    } catch (e) {
        dispatch(changeTicketStatusError(e));
    }
}

// Санк для удаления всех тикетов пользователя из глоба стол и FB. принимает уид пользователя и дату тикета
export const removeUserTickets = (uid, isAdmin) => async (dispatch, _, api) => {
    try {
        dispatch(removeUserTicketsStart());

        const userTickets = await api.getTicketsFromFirebaseApi(uid).then(data => data.val()); // Приходит объект вида { Дата: {}, Дата: {} }

        const ticketDates = [];
        for (let dataKey in userTickets) {
            ticketDates.push(dataKey);
        }

        await api.removeUserTicketsFromFBApi(uid); // Удаляем тикеты пользователя из FB

        // В экшен будем передавать массив с датами тикетов, которые нужно удалить из глобал стейт
        dispatch(removeUserTicketsSuccess(ticketDates));
    } catch (error) {
        dispatch(removeUserTicketsError(error))
    }
};
