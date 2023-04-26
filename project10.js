let button = document.querySelector(".btn");
let prev = document.querySelector(".prev");
let box = document.querySelector(".box-section");
let title = document.querySelector(".title-2");
let form = document.querySelector(".form-section");
let transactions = document.querySelector(".transactions");
let balance = document.querySelector(".balance-text");
let deposit_info = document.querySelector(".deposit-details-2");
let withdrawal3 = document.querySelector(".w-details-2");
let in_details = document.querySelector(".in-details-2");
let login = document.querySelector(".login");
let password = document.querySelector(".password");
let transferamount_to = document.querySelector(".transfer-money-2");
let transferamount = document.querySelector(".amount-2");
let btn2 = document.querySelector(".btn-2");
let box_item = document.querySelector(".box-item");
let form2 = document.querySelector(".form-section-2");
let prev2 = document.querySelector(".prev-2");
let money_2=document.querySelector(".money-2-info");
let btn3=document.querySelector(".btn-3");
let btn_4=document.querySelector(".btn-section-3")
let para=document.querySelector(".section-3-para_1");
let para2=document.querySelector(".section-3-para_2");
let details_3=document.querySelector(".details-3");
button.addEventListener("click", xyz);
prev.addEventListener("click", xyz2);
let acc_1;
let password2;
let users = [];
function xyz() {


    if (localStorage.length == 0) {
        alert("Create an account first");
        login.value = "";
        password.value = "";
    }
    else {
        form2.classList.add("active-3");
        let parsed_data = JSON.parse(localStorage.getItem("users")) || [];
        acc_1 = JSON.parse(localStorage.getItem("users")).find(function (value, i) {
            return value.owner === login.value;
        })
        password2 = parsed_data.find(function (value, i) {
            console.log(password.value);
            return value.pin === Number(password.value);
        })
        console.log(acc_1);
        if (acc_1 != undefined) {


            if (password2 == undefined) {
                alert("Please Enter the Correct Password");
                password.value = "";
            }
            else {
                if (password2.owner === acc_1.owner) {
                    // alert(`Welcome ${acc.owner} `);
                    prev.classList.add("active3");
                    if (!(form.classList.contains("active"))) {
                        form.classList.add("active");
                        box.classList.add("active2");
                        createtransactions(acc_1.movements);
                        transaction_details(acc_1);
                        generatebalance(acc_1);
                        title.textContent = `Hello ${acc_1.owner}, Welcome`;


                    }
                }
                else {
                    alert("Re-Enter the Password");
                    password.value = "";
                }
            }


        }
        else {
            alert("Please Enter the correct Username");
            login.value = "";
        }
    }
}
// let account1 = {
//     owner: "Anurag Mishra",
//     movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//     interestRate: 1.2,
//     pin: 1111,
// }
// let account2 = {
//     owner: "Aman Dhattarwal",
//     movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//     interestRate: 1.5,
//     pin: 2222,
// }
let createtransactions = function (transaction,sort=false) {
    transactions.innerHTML = "";
    let transaction2;
    if(sort)
    {
        transaction2=transaction.slice().sort(function(a,b)
        {
            return a-b;
        })
        console.log(transaction2);
    }
    else
    {
        transaction2=transaction.slice();
    }
    transaction2.forEach(function (value, i) {
        let type;
        if (value > 0) {
            type = "deposit";
        }
        else {
            type = "withdrawal";
        }
        let html = `
        <div class="transactions-row">
        <div class="transaction-type transaction-${type}">${i + 1} ${type}</div>
        <div class="transaction-value">${value}</div>
    </div>    
        `;
        transactions.insertAdjacentHTML("afterbegin", html);
    })

}
// createtransactions(account1.movements);
// console.log(transactions.innerHTML);


/*usernames*/


let createUsernames = function (acc) {
    acc.forEach(function (value, i) {

        value.username = value.owner.toLowerCase().split(" ").map(function (value, i) {
            return value[0];
        }).join("");
    })
}
createUsernames(users);
// console.log(users);



/* balance*/
let generatebalance = function (acc) {
    let balance2 = 0;
    balance2 = acc.movements.reduce(function (acc, value, i) {

        return acc + value;
    }, 0);
    acc.balance = balance2;
    // console.log(balance2);
    balance.textContent = `${balance2.toFixed(2)}$`;
}


// generatebalance(account1.movements);

// max value from the account 1 movements
// let maxvalue=function(movements)
// {
//     let x=movements.reduce(function(acc,value,i)
//     {
//         if(value>acc)
//         {

//             return value;
//         }
//         else
//         {
//             return acc;
//         }
//     },movements[0]);
//     return x;
// }




// console.log(maxvalue(account1.movements));

let transaction_details = function (acc) {
    if (acc.movements.length >= 1) {
        let deposit = acc.movements.filter(function (value, i) {
            return value > 0;
        })
        let withdrawal2 = acc.movements.filter(function (value, i) {
            return value < 0;
        })

        let deposit_sum = deposit.reduce(function (acc, value, i) {
            return acc + value;
        }, 0)
        let withdrawal_sum = Math.abs(withdrawal2.reduce(function (acc, value, i) {

            return acc + value;
        }, 0)


        )
        deposit_info.textContent = `${deposit_sum}$`;
        withdrawal3.textContent = `${withdrawal_sum} $`;
        let interest = deposit.map(function (value, i) {
            return (value * acc.interestRate) / 100;
        }).reduce(function (acc, value, i) {
            return acc + value;
        }, 0)
        in_details.textContent = interest.toFixed(2);
    }
    else {
        deposit_info.textContent = "--";
        withdrawal3.textContent = "--";
        in_details.textContent = "--";

    }

}

// transaction_details(account1.movements);



// let check= function(movements)
// {
//     let arr2=movements.find(function(value ,i)
//     {
//         return value<0;
//     })
//     console.log(arr2);
// }
// check(account1.movements);
function xyz2() {
    form.classList.remove("active");
    box.classList.remove("active2");
    login.value = "";
    password.value = "";
    prev.classList.remove("active3");

}
btn2.addEventListener("click", function () {
    let amount_to = transferamount_to.value;
    let parsed_data3=JSON.parse(localStorage.getItem("users"))||[];
    let acc2 = JSON.parse(localStorage.getItem("users")).find(function (value, i) {
        return value.owner === amount_to;
    })
    let amount = Number(transferamount.value);
    if (acc2 != undefined) {
        if (acc2.owner != acc_1.owner) {
            if (amount > 0 && amount < acc_1.balance) {
                console.log("yes");
                acc_1.movements.push(-amount);
                acc2.movements.push(amount);
                users = parsed_data3.map(function (value, i) {

                    console.log(value.owner, acc_1.owner);
                    if (value.owner === acc_1.owner) {
                        return acc_1;
                    }
                    else {
                        if (value.owner === acc2.owner) {
                            return acc2;
                        }
                        else {
                            return value;
                        }
                    }
                })
                localStorage.setItem("users", JSON.stringify(users));
                xyz3(acc_1);
                transferamount_to.value = "";
                transferamount.value = "";
            }
            else {
                alert("Please Enter the transfer amount within the account balance");

            }
        }
        else {
            alert("Same acc PLease Select Any Other Acc for transferring the money here");
        }


    }
    else {
        alert(`No account with a username ${amount_to}  exists,Please Check The UserName`);
    }
})

function xyz3(acc) {
    createtransactions(acc.movements);
    transaction_details(acc);
    generatebalance(acc);
}

box_item.addEventListener("click", function (e) {
    e.preventDefault();
    form.classList.add("active-1");
    form2.classList.add("active1");
})
prev2.addEventListener("click", function () {
    form.classList.remove("active-1");
    form2.classList.remove("active1");
})

let form2_login = document.querySelector(".form2-login");
let form2_password = document.querySelector(".form2-password");
let form2_btn = document.querySelector(".form2-btn");
form2_btn.addEventListener("click", function () {
    // console.log(form2_login.value,form2_password.value);
    if (form2_login.value == "") {
        alert("Fill The details");
    }
    else {
        let acc_username = form2_login.value;
        let acc_password = form2_password.value;
        if (localStorage.length == 0) {
            // console.log(acc_username, acc_password);
            let user = {
                owner: acc_username,
                pin: Number(acc_password),
                movements: [2000],
                interestRate: 1.2,
            }
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            alert("User Created Successfully");
            form2_login.value = "";
            form2_password.value = "";
        }
        else {
            console.log(form2_login.value);
            let retrieved_obj = JSON.parse(localStorage.getItem("users"));
            let check = retrieved_obj.find(function (value, i) {

                return value.owner == form2_login.value;
            })
            if (check) {
                alert("Username Already Exists");
                form2_login.value = "";
                form2_password.value = "";
            }
            else {
                let retrieved_password=retrieved_obj.find(function(value3,i)
                {
                    
                    return value3.pin===Number(acc_password);
                })
                if(retrieved_password==undefined)
                {
                let user = {
                    owner: acc_username,
                    pin: Number(acc_password),
                    movements: [2000],
                    interestRate: 1.2,
                }
                retrieved_obj.push(user);
                localStorage.setItem("users", JSON.stringify(retrieved_obj));
                alert("User Created Successfully");
                form2_login.value = "";
                form2_password.value = "";
            }
            else
            {
                alert("Password Already Exists Please Enter Any Other Password");
                form2_password.value="";
            }
        }
        }

    }


})
btn3.addEventListener("click",function()
{
    let parsed_data=JSON.parse(localStorage.getItem("users"))||[];
    console.log(parsed_data);
    acc_1.movements.push(Math.floor(money_2.value));
   xyz3(acc_1);
//    console.log(users);
  parsed_data.map(function(value,i)
  {
    if(value.owner==acc_1.owner)
    {
        value.movements.push(Math.floor(money_2.value));
    }
  })
  localStorage.setItem("users",JSON.stringify(parsed_data));
  money_2.value="";
//   console.log(parsed_data);


})
btn_4.addEventListener("click",function()
{
    let parsed_data=JSON.parse(localStorage.getItem("users"))||[];
    let acc3=parsed_data.find(function(value,i)
    {
        return value.owner===para.value;
    })
   if(acc3)
   {
          if(acc3.pin===Number(para2.value))
          {
              users=parsed_data.filter(function(value,i)
              {
               return value.owner!=para.value;
              })
              console.log(parsed_data);
             localStorage.setItem("users",JSON.stringify(users));
             alert("The acc has been deleted successfully");
             para.value="";
             para2.value="";
          }
   }
   else
   {
    alert(`No acc with a username ${para.value} exists Please check the username again`);
    para.value="";
    para2.value="";
   }
    

})
let check=false;
details_3.addEventListener("click",function()
{
    createtransactions(acc_1.movements,!check)
    check=!check;
})
let box3=[...document.querySelectorAll(".box-3")];
let icons=[...document.querySelectorAll(".icon")];
box3.forEach(value=>{
      value.addEventListener("click",function()
      {
          icons.forEach(value3=>
            {
                value3.classList.remove("active-1");
            });
            this.previousElementSibling.classList.add("active-1");
      })
})

let box1=[...document.querySelectorAll(".box-1")];
let icons2=[...document.querySelectorAll(".form2-icon-1")];
console.log(icons2);

box1.forEach(value=>{
    value.addEventListener("click",function()
    {
      
        icons2.forEach(value2=>{
            value2.classList.remove("active-2");
        })
        this.previousElementSibling.classList.add("active-2");
    })
    
})