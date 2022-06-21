const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;
// console.log(ticketPrice)

populateUI()
// 更新座位數及總票價
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats);

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    // console.log(seatsIndex)

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount);
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// 保存電影索引值和票價
function setMovieData(movieIndex, moivePrice) {
    localStorage.setItem('selectedMoiveIndex', movieIndex)
    localStorage.setItem('selectedMoivePrice', moivePrice)
}
// 獲取localstorage資料並渲染
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    // console.log(selectedSeats)
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectMovieIndex !== null) {
        movieSelect.selectedIndex = selectMovieIndex;
    }
}

// 電影下拉框事件監聽
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    // console.log(ticketPrice);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


// 座位點擊事件
container.addEventListener('click', (e) => {
    // console.log(e.target)
    if (e.target.classList.contains("seat") && !e.target.classList.contains('occupied')) {
        // console.log(e.target)
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
})

// 設定init座位和總票價
updateSelectedCount();