"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Calendar = /*#__PURE__*/ (function () {
  function Calendar() {
    _classCallCheck(this, Calendar);

    this.monthDiv = document.querySelector(".cal-month__current");
    this.headDivs = document.querySelectorAll(".cal-head__day");
    this.bodyDivs = document.querySelectorAll(".cal-body__day");
    this.nextDiv = document.querySelector(".cal-month__next");
    this.prevDiv = document.querySelector(".cal-month__previous");
  }

  _createClass(Calendar, [
    {
      key: "init",
      value: function init() {
        var _this = this;

        moment.locale(
          window.navigator.userLanguage || window.navigator.language
        );
        this.month = moment();
        this.today = this.selected = this.month.clone();
        this.weekDays = moment.weekdaysShort(true);
        this.headDivs.forEach(function (day, index) {
          day.innerText = _this.weekDays[index];
        });
        this.nextDiv.addEventListener("click", function (_) {
          _this.addMonth();
        });
        this.prevDiv.addEventListener("click", function (_) {
          _this.removeMonth();
        });
        this.bodyDivs.forEach(function (day) {
          day.addEventListener("click", function (e) {
            var date =
              +e.target.innerHTML < 10
                ? "0".concat(e.target.innerHTML)
                : e.target.innerHTML;

            if (e.target.classList.contains("cal-day__month--next")) {
              _this.selected = moment(
                ""
                  .concat(_this.month.add(1, "month").format("YYYY-MM"), "-")
                  .concat(date)
              );
            } else if (
              e.target.classList.contains("cal-day__month--previous")
            ) {
              _this.selected = moment(
                ""
                  .concat(
                    _this.month.subtract(1, "month").format("YYYY-MM"),
                    "-"
                  )
                  .concat(date)
              );
            } else {
              _this.selected = moment(
                "".concat(_this.month.format("YYYY-MM"), "-").concat(date)
              );
            }

            _this.update();
          });
        });
        this.update();
      }
    },
    {
      key: "update",
      value: function update() {
        this.calendarDays = {
          first: this.month.clone().startOf("month").startOf("week").date(),
          last: this.month.clone().endOf("month").date()
        };
        this.monthDays = {
          lastPrevious: this.month
            .clone()
            .subtract(1, "months")
            .endOf("month")
            .date(),
          lastCurrent: this.month.clone().endOf("month").date()
        };
        this.monthString = this.month.clone().format("MMMM YYYY");
        this.draw();
      }
    },
    {
      key: "addMonth",
      value: function addMonth() {
        this.month.add(1, "month");
        this.update();
      }
    },
    {
      key: "removeMonth",
      value: function removeMonth() {
        this.month.subtract(1, "month");
        this.update();
      }
    },
    {
      key: "draw",
      value: function draw() {
        this.monthDiv.innerText = this.monthString;
        var index = 0;

        if (this.calendarDays.first > 1) {
          for (
            var day = this.calendarDays.first;
            day <= this.monthDays.lastPrevious;
            index++
          ) {
            this.bodyDivs[index].innerText = day++;
            this.cleanCssClasses(false, index);
            this.bodyDivs[index].classList.add("cal-day__month--previous");
          }
        }

        var isNextMonth = false;

        for (var _day = 1; index <= this.bodyDivs.length - 1; index++) {
          if (_day > this.monthDays.lastCurrent) {
            _day = 1;
            isNextMonth = true;
          }

          this.cleanCssClasses(true, index);

          if (!isNextMonth) {
            if (
              _day === this.today.date() &&
              this.today.isSame(this.month, "day")
            ) {
              this.bodyDivs[index].classList.add("cal-day__day--today");
            }

            if (
              _day === this.selected.date() &&
              this.selected.isSame(this.month, "month")
            ) {
              this.bodyDivs[index].classList.add("cal-day__day--selected");
            }

            this.bodyDivs[index].classList.add("cal-day__month--current");
          } else {
            this.bodyDivs[index].classList.add("cal-day__month--next");
          }

          this.bodyDivs[index].innerText = _day++;
        }
      }
    },
    {
      key: "cleanCssClasses",
      value: function cleanCssClasses(selected, index) {
        this.bodyDivs[index].classList.contains("cal-day__month--next") &&
          this.bodyDivs[index].classList.remove("cal-day__month--next");
        this.bodyDivs[index].classList.contains("cal-day__month--previous") &&
          this.bodyDivs[index].classList.remove("cal-day__month--previous");
        this.bodyDivs[index].classList.contains("cal-day__month--current") &&
          this.bodyDivs[index].classList.remove("cal-day__month--current");
        this.bodyDivs[index].classList.contains("cal-day__day--today") &&
          this.bodyDivs[index].classList.remove("cal-day__day--today");

        if (selected) {
          this.bodyDivs[index].classList.contains("cal-day__day--selected") &&
            this.bodyDivs[index].classList.remove("cal-day__day--selected");
        }
      }
    }
  ]);

  return Calendar;
})();

var cal = new Calendar();
cal.init();






// get modal element
var modal = document.getElementById("simpleModal");

// get open modal button
var modalBtn = document.getElementById("modalBtn");

//get close button
var closeBtn = document.getElementsByClassName("closeBtn")[0];

//Listen for events
// 1. Listen for open click
modalBtn.addEventListener("click", openModal);

//Listen for close click
closeBtn.addEventListener("click", closeModal);

//Listen for outside click
window.addEventListener("click", outsideClick);

//function to open modal

function openModal() {
  modal.style.display = "block";
}

//function to open modal

function closeModal() {
  modal.style.display = "none";
}

//function to close modal if the window outside the modal is clicked

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}