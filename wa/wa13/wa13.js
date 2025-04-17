const workers = {
    "employees" : [
{
            "name" : "Sam",
            "department" : "Tech",
            "designation" : "Manager",
            "salary" : 40000,
            "isRaiseEligible" : true
        },
{
            "name" : "Mary",
            "department" : "Finance",
            "designation" : "Trainee",
            "salary" : 18500,
            "isRaiseEligible" : true
        },
{
            "name" : "Bill",
            "department" : "HR",
            "designation" : "Executive",
            "salary" : 21200,
            "isRaiseEligible" : false
        }
    ]
    }
    //Problem 1
console.log("question 1")
console.log(workers)

const company = {
    "name" : "TechStars",
    "website" : "www.techstars.site",
    "employees" : workers
}
//Problem 2
console.log("question 2")
console.log(company)

//Problem 3, add Anna, Tech, Executive, 25600, false
workers.employees.push({
    "name" : "Anna",
    "department" : "Tech",
    "designation" : "Executive",
    "salary" : 25600,
    "isRaiseEligible" : false
})
console.log("question 3")
console.log(workers)

//Problem 4, total salary of all employees 
let totalSalary = 0;
for (let i = 0; i < workers.employees.length; i++) {
    totalSalary += workers.employees[i].salary;
}
console.log("question 4")
console.log("Total Salary: " + totalSalary)

//Problem 5, give a raise of 10% to all employees who are eligible for a raise then set to false
for (let i = 0; i < workers.employees.length; i++) {
    if (workers.employees[i].isRaiseEligible) {
        workers.employees[i].salary += workers.employees[i].salary * 0.1;
        workers.employees[i].isRaiseEligible = false;
    }
}
console.log("question 5")
console.log(workers)

//Set Anna and Same to true for "wfh" or work from home
for (let i = 0; i < workers.employees.length; i++) {
    if (workers.employees[i].name === "Anna" || workers.employees[i].name === "Sam") {
        workers.employees[i].isWFH = true;
    }
    else {
        workers.employees[i].isWFH = false;
    }
}
console.log("question 6")
console.log(workers)