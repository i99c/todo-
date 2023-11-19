function randomRgb() {
    let random1 = Math.floor(Math.random() * 256)
    let random2 = Math.floor(Math.random() * 256)
    let random3 = Math.floor(Math.random() * 256)
    let opaklik = Math.random().toFixed(1)

    return `rgb(${random1},${random2},${random3}, ${opaklik})`

}

// console.log(Math.random().toFixed(1))
console.log(randomRgb())

const container = document.querySelector(".container")

let interval = setInterval(() => {
    container.style.backgroundColor = randomRgb()

}, 1000);



setTimeout(() => {
    clearInterval(interval)
}, 10000);


// * ------

/*  <!-- <ul id="liste" class="list-unstyled">
                <li class="d-flex justify-content-between align-items-center bg-success px-3">
                    <p class="mt-3">Yapılacak Bir Şey</p>
                    <div class="d-flex gap-3">
                        <i class="fa-solid fa-trash"></i>
                    <i class="fa-solid fa-check"></i>
                    </div>
                </li>

            </ul> -->*/

            const input = document.getElementById("input");
            const btn = document.querySelector("#btn");
            const liste = document.querySelector("#liste");
            const zaman = document.querySelector("#tarih");
            const toDoDiv = document.getElementById("toDo");
            
            // Sayfa yüklendiğinde localStorage'dan to-do bilgilerini ve tarih bilgisini al
            window.onload = function () {
                const savedToDoList = localStorage.getItem("toDoList");
                if (savedToDoList) {
                    liste.innerHTML = savedToDoList;
                    addClickListenersToItems();
                }
            
                const savedZaman = localStorage.getItem("zaman");
                if (savedZaman) {
                    zaman.textContent = savedZaman;
                }
            };
            
            setInterval(() => {
                const currentZaman = tarih(true); // true parametresiyle tarih ve saat bilgisini al
                zaman.textContent = currentZaman;
                // Her saniyede localStorage'a güncel tarih bilgisini kaydet
                localStorage.setItem("zaman", currentZaman);
            }, 1000);
            
            btn.addEventListener("click", toDo);
            
            input.addEventListener("keyup", (element) => {
                if (element.keyCode == 13) {
                    toDo();
                }
            });
            
            // Yeni bir to-do eklediğimizde localStorage'a to-do bilgisini kaydet
            function saveToDoList() {
                localStorage.setItem("toDoList", liste.innerHTML);
                addClickListenersToItems(); // Yeni öğeler için tıklama dinleyicilerini ekleyin
            }
            
            function toDo() {
                const li = document.createElement("li");
                li.classList.add("d-flex", "justify-content-between", "align-items-center", "px-3", "mt-2", "rounded-1");
                li.style.backgroundColor = randomRgb();
            
                const p = document.createElement("p");
                p.classList.add("mt-3");
                p.textContent = input.value.trim();
            
                const iconDiv = document.createElement("div");
                iconDiv.classList.add("d-flex", "gap-3");
            
                const check = document.createElement("i");
                check.classList.add("fa-solid", "fa-check");
            
                const trash = document.createElement("i");
                trash.classList.add("fa-solid", "fa-trash");
            
                const tarihDiv = document.createElement("div");
                tarihDiv.classList.add("text-secondary");
                tarihDiv.textContent = tarih(); // Yeni to-do eklediğimizde tarih bilgisini al
            
                if (input.value != "") {
                    li.append(p);
                    iconDiv.append(check);
                    iconDiv.append(trash);
                    li.append(iconDiv);
                    li.appendChild(tarihDiv); // Tarih bilgisini ekleyin
                    liste.appendChild(li);
            
                    check.addEventListener("click", function () {
                        let yazi = this.parentElement.previousElementSibling;
                        yazi.classList.toggle("text-decoration-line-through");
                        yazi.classList.toggle("text-secondary");
                        // Değişiklik olduğunda localStorage'a to-do bilgisini kaydet
                        saveToDoList();
                    });
            
                    trash.addEventListener("click", function () {
                        let sil = this.parentElement.parentElement;
                        sil.remove();
                        // Silindiğinde localStorage'a to-do bilgisini kaydet
                        saveToDoList();
                    });
            
                    // Eğer input değeri boş değilse, yeni bir to-do ekledikten sonra input'u temizle
                    if (input.value.trim() !== "") {
                        input.value = "";
                    }
            
                    // localStorage'a to-do bilgisini kaydet
                    saveToDoList();
                } else {
                    alert("Lütfen Bir Değer Giriniz...");
                }
            }
            
            function tarih(includeDate = false) {
                let date = new Date();
                let gunler = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
                let aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
                let gun = gunler[date.getDay()];
                let ay = aylar[date.getMonth()];
                let ayinGunu = date.getDate();
                let yil = date.getFullYear();
                let saat = date.getHours();
                let dakika = date.getMinutes();
                let saniye = date.getSeconds();
            
                if (saniye < 10) {
                    saniye = "0" + saniye;
                }
                if (dakika < 10) {
                    dakika = "0" + dakika;
                }
            
                let tarihSaat = `${gun} ${includeDate ? ayinGunu + ' ' + ay + ' ' + yil : ''} ${saat}:${dakika}:${saniye}`;
                return tarihSaat;
            }
            
            // Tıklanabilir öğelere tıklama dinleyicilerini ekler
            function addClickListenersToItems() {
                const items = document.querySelectorAll("#liste li");
                items.forEach(item => {
                    const check = item.querySelector(".fa-check");
                    const trash = item.querySelector(".fa-trash");
            
                    check.addEventListener("click", function () {
                        let yazi = this.parentElement.previousElementSibling;
                        yazi.classList.toggle("text-decoration-line-through");
                        yazi.classList.toggle("text-secondary");
                        // Değişiklik olduğunda localStorage'a to-do bilgisini kaydet
                        saveToDoList();
                    });
            
                    trash.addEventListener("click", function () {
                        let sil = this.parentElement.parentElement;
                        sil.remove();
                        // Silindiğinde localStorage'a to-do bilgisini kaydet
                        saveToDoList();
                    });
                });
            }
            