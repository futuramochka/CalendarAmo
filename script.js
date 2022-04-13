let calendarInternal = new Calendar();
calendarInternal.createTableCalendar();

let Month = document.querySelector('.name-month');
let nameMonth = Month.getAttribute('month');
calendarInternal.DateNum(nameMonth);

calendarInternal.getNameMonth();
calendarInternal.setNameMonth();
calendarInternal.colorCalendar();