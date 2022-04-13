class Calendar{
    constructor(){
        //For Table Calendar
        this.table = "<table class='table-calendar'></table>";
        this.thead = "<thead></thead>";
        this.tbody = "<tbody></tbody>";
        this.columnHead = "<th class='table-day'></th>";
        this.columnBody = "<td class='table-day--num'></td>";
        this.row = "<tr class='table-row'></tr>";

        this.objDay = {
            0 : "пн",
            1 : "вт",
            2 : "ср",
            3 : "чт",
            4 : "пт",
            5 : "сб",
            6 : "вс"
        }
        this.sectionCalendar = document.querySelector(".calendar-day");

        //For carousel view Month
        this.carousel = "<div class='carousel-button'></div>";
        this.buttonPrev = "<button num='1' class='prev button'>&larr;</button>";
        this.buttonNext = "<button num='2' class='next button'>&rarr;</button>";
        this.nameMonth = "<p month='3' class='name-month'></p>";
        this.objNameMonth = {
            0 : "Январь",
            1 : "Февраль",
            2 : "Март",
            3 : "Апрель",
            4 : "Май",
            5 : "Июнь",
            6 : "Июль",
            7 : "Август",
            8 : "Сентябрь",
            9 : "Октябрь",
            10 : "Ноябрь",
            11 : "Декабрь"
        }
    }

    createTableCalendar(){
        this.sectionCalendar.innerHTML = this.table;

        let table = document.querySelector(".table-calendar");;
        table.innerHTML = this.thead;

        let thead = document.querySelector("thead");
        thead.innerHTML = this.row;

        let row = document.querySelector(".table-row");
        for(let dayRow in this.objDay){
            row.insertAdjacentHTML("beforeend", this.columnHead);

            let columnHead = document.querySelectorAll(".table-day"); //Перепесать отдельно для сетера
            for(let i = 0; i < columnHead.length; i++){
                if(i == dayRow){
                    columnHead[i].innerHTML = this.objDay[dayRow]
                }
            }
        }

        thead.insertAdjacentHTML("afterend",this.tbody);
        
        let tbody = document.querySelector("tbody");
        for(let i = 0; i < 6; i++){
            tbody.insertAdjacentHTML("beforeend",this.row);
        }
       
        let rowTbody = document.querySelectorAll("tbody .table-row");
        for(let valueRow = 0; valueRow < rowTbody.length; valueRow++){
            for(let dayRowTbody in this.objDay){
                let elemRow = rowTbody[valueRow];
                elemRow.insertAdjacentHTML("beforeend", this.columnBody);
            }
        }

        //Создаём кнопки перелистывания месяца с одображением текущего месяца
        table.insertAdjacentHTML('afterend', this.carousel);

        let carousel = document.querySelector(".carousel-button");
        carousel.insertAdjacentHTML('beforeend',this.buttonPrev);
        carousel.insertAdjacentHTML('beforeend', this.nameMonth);
        carousel.insertAdjacentHTML('beforeend', this.buttonNext);

        //Берём текущий месяц из атрибута month
        let nameMonth = document.querySelector(".name-month");
        let todayMonth = nameMonth.getAttribute("month");
        todayMonth = Number(todayMonth);
        
        //Показываем текущий месяц на странице
        nameMonth.innerHTML = this.objNameMonth[Number(todayMonth)]+" 2022г.";
        
        return this;
    }

    handleEvent(event){
        let buttonTag = event.currentTarget;
        let buttonNum = buttonTag.getAttribute("num");
        let nameMonth = document.querySelector(".name-month");
        let todayMonth = nameMonth.getAttribute("month"); 
        this.objNameMonth = {
            0 : "Январь",
            1 : "Февраль",
            2 : "Март",
            3 : "Апрель",
            4 : "Май",
            5 : "Июнь",
            6 : "Июль",
            7 : "Август",
            8 : "Сентябрь",
            9 : "Октябрь",
            10 : "Ноябрь",
            11 : "Декабрь"
        }
        
        let objName = this.objNameMonth;
        
        switch(buttonNum){
            case "1" : 
                if(todayMonth > 0){
                    nameMonth.innerHTML = objName[Number(todayMonth)-1]+" 2022г."
                    todayMonth--;
                    if(todayMonth > -1){
                        nameMonth.setAttribute('month',todayMonth)
                    }
                }
            break;
            case "2" : 
                if(todayMonth < 11){
                    nameMonth.innerHTML = objName[Number(todayMonth)+1]+" 2022г."
                    todayMonth++;
                    nameMonth.setAttribute('month',todayMonth)
                }
            break;
        }
    }

    getNameMonth(){
        let buttonsCalendar = document.querySelectorAll(".button");


        for(let item of buttonsCalendar){
            item.addEventListener('click', calendarInternal.handleEvent);
        }
    }

    setNameMonth(){
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                let nameMonth = Month.getAttribute('month');
                calendarInternal.DateNum(nameMonth);

                let element = document.querySelectorAll(".table-day--num");
                for(let item of element){
                    item.style = " "
                }
                calendarInternal.colorCalendar()
            }) 
        })    
        
        observer.observe(
            Month,
            {
                attributes: true,
                attributeOldValue: true,
            }
        );
    }

    DateNum(nameMonth){
        let grandMonth = nameMonth;
        
        let grandDate = new Date ();
        grandDate.setMonth(grandMonth);
        let todayMonth = grandDate.getMonth()

        allDay(todayMonth);
        function allDay(month){
            Date.prototype.daysInMonth = function() {
                this.setMonth(month);
                return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
            };
        }
        
        let allDayInMonth = new Date().daysInMonth();
        let elemRow = document.querySelectorAll("tbody .table-row");
        
        let allElemColumn = [];

        grandDate.setDate(1);
        
        let firstDayInMonth = grandDate.getDay();
        if(firstDayInMonth == 0){
            firstDayInMonth = 7;
        }
        let month = grandDate.getMonth();

        for(let i = 1; i <= elemRow.length; i++){
            
            let elemColumn = document.querySelectorAll(".table-row:nth-child("+ i +") .table-day--num");
            for(let u = 0; u < elemColumn.length; u++){
                allElemColumn.push(elemColumn[u]);
            }
        }

        let sunday = 1;
        let cursorForFirstDay = firstDayInMonth - sunday;
        let cursorForLastMonthDay = allDayInMonth + cursorForFirstDay;

        grandDate.setMonth(month-1)
        let leterMonth = grandDate.getMonth();
        allDay(leterMonth);
        let allDayInMonthPrev = new Date().daysInMonth();

        let nextMonthDayCounter = 1;
        let numExtraZero = 1;

        for(let item in allElemColumn){
            if(item >= cursorForFirstDay && item < cursorForLastMonthDay){
                allElemColumn[item].innerHTML = (Number(item)-(cursorForFirstDay-1));
            }else if(item >= cursorForLastMonthDay){
                allElemColumn[item].innerHTML = nextMonthDayCounter;
                nextMonthDayCounter++;
            }else if(item < cursorForFirstDay){
                let allItem = cursorForFirstDay - (Number(item)+numExtraZero);
                allElemColumn[item].innerHTML = allDayInMonthPrev - allItem;
            }
        }
    }

    colorCalendar(){
        
        let Index = [];

        let column = document.querySelectorAll('.table-day--num');
        column.forEach(getElementColumn);

        function getElementColumn(item, index){
            if(item.innerHTML === "1"){
                Index.push(index);
            }
        }
        for(let i = 0; i < column.length; i++){
            if(i >= Index[0] && i < Index[1]){
                column[i].style.fontWeight = "bold"
            }else{
               column[i].style.color = "gray"
            }
        }
    }
}

