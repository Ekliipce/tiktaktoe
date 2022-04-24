console.log("hello world! test")

const res = document.getElementById("result");
const refresh_button = document.getElementById("refresh")
const sc_p1 = document.getElementById("sc_p1")
const sc_p2 = document.getElementById("sc_p2")
let mini = document.getElementsByClassName("mini")

let tour = 0
let finish = false

let mini_list_p1 = []
let mini_list_p2 = []

let p1_point = 0
let p2_point = 0

refresh_button.addEventListener("click", () => {
  tour = 0
  finish = false
  mini_list_p1 = []
  mini_list_p2 = []

  for (var i = 0; i < mini.length; i++){
    const elm = mini[i]
    if (elm.classList.contains("red")
        || elm.classList.contains("blue")){
      const to_remove = elm.firstElementChild
      elm.removeChild(to_remove)

      elm.classList.remove("blue")
      elm.classList.remove("red")
    }
  }
})

for (var i = 0; i < mini.length; i++){
  const elm = mini[i]
  elm.addEventListener("click", () => {
    if (!elm.classList.contains("red") &&              !elm.classList.contains("blue") && !finish) {
      if (tour % 2 == 0){
        elm.classList.add("red")
        add_circle(elm, "circle")
        
        mini_list_p1.push({"x": elm.getAttribute("x"), "y":elm.getAttribute("y")});
        
        console.log(mini_list_p1)
      }
      else{
        elm.classList.add("blue")
        add_circle(elm, "square")
        
        mini_list_p2.push({"x": elm.getAttribute("x"), "y":elm.getAttribute("y")});
        
        console.log(mini_list_p2)
      }
      tour++;
    }

    check_finish(mini_list_p1, mini_list_p2, tour, res)
  })
}

function check(list){
  var sum_y = 0
  var sum_x = 0
  var diag_1 = 0
  var diag_2 = 0
  
  for (var i = 0; i < 3; i++){
    sum_y = 0
    sum_x = 0
    diag_1 = 0
  
    
    for (var j = 0; j < list.length; j++){
      if (list[j].y == i)
        sum_y++
      if (list[j].x == i)
        sum_x++

      if (list[j].y == list[j].x)
        diag_1++
      
      if ((list[j].y == 3 - i - 1 && list[j].x == i))
        diag_2++
    }
    
    if (sum_y == 3 || sum_x == 3 || 
        diag_1 == 3 || diag_2 == 3)
      return true    
  }
  
  return false
}

function add_circle(elm, classe_forme){
  var forme = document.createElement("div")
  forme.classList.add(classe_forme)
  elm.appendChild(forme)
}

function check_finish(){
  if (!finish){
    if (check(mini_list_p1)){
      res.innerText = "P1 wins"
      finish = true
      p1_point++
      sc_p1.innerText = p1_point
    }
    else if (check(mini_list_p2)){
      res.innerText = "P2 wins"
      finish = true
      p2_point++
      sc_p2.innerText = p2_point
    }
    else if (tour == 9){
      res.innerText = "Nobody Wins"
      finish = true
    }
  }
}