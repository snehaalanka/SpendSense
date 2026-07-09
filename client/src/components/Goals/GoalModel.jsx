import { useState } from "react";

import { toast } from "react-toastify";

import { createGoal } from "../../api/goalApi";
const GoalModal=({show,onClose})=>{

const [goal,setGoal]=useState({

goalName:"",
targetAmount:"",
savedAmount:"",
targetDate:"",

});

const token=localStorage.getItem("token");
if(!show) return null;
const handleChange=(e)=>{

setGoal({

...goal,

[e.target.name]:e.target.value,

});

};
const validateGoal=()=>{

const name=goal.goalName.trim();

if(!name){

toast.error("Goal name is required.");

return false;

}

if(name.length<3){

toast.error("Goal name must contain at least 3 characters.");

return false;

}

if(name.length>50){

toast.error("Goal name cannot exceed 50 characters.");

return false;

}

if(/^\d+$/.test(name)){

toast.error("Goal name cannot contain only numbers.");

return false;

}

if(!/[A-Za-z]/.test(name)){

toast.error("Goal name cannot contain only symbols.");

return false;

}

const amount=Number(goal.targetAmount);

if(Number.isNaN(amount)||amount<100){

toast.error("Target amount must be at least ₹100.");

return false;

}

if(amount>10000000){

toast.error("Target amount is too large.");

return false;

}

const saved=Number(goal.savedAmount||0);

if(saved<0){

toast.error("Saved amount cannot be negative.");

return false;

}

if(saved>amount){

toast.error("Saved amount cannot exceed target amount.");

return false;

}

if(!goal.targetDate){

toast.error("Please choose a target date.");

return false;

}

const selected=new Date(goal.targetDate);

const today=new Date();

today.setHours(0,0,0,0);

if(selected<=today){

toast.error("Target date must be in the future.");

return false;

}

return true;

};
const handleSubmit=async()=>{

if(!validateGoal()) return;

try{

await createGoal(

{

...goal,

goalName:goal.goalName.trim(),

savedAmount:goal.savedAmount||0,

},

token

);

toast.success("Goal created successfully.");

setGoal({

goalName:"",
targetAmount:"",
savedAmount:"",
targetDate:"",

});

onClose();

}
catch(err){

toast.error(

err.response?.data?.message||

"Unable to create goal."

);

}

};
return (

<div className="modal-overlay">

<div className="goal-modal">

<h2>Create New Goal</h2>

<div className="goal-form">

<div className="form-group">

<label>Goal Name</label>

<input
type="text"
name="goalName"
placeholder="Laptop, Bike, Vacation..."
value={goal.goalName}
onChange={handleChange}
maxLength={50}
/>

</div>

<div className="form-group">

<label>Target Amount</label>

<input
type="number"
name="targetAmount"
placeholder="70000"
value={goal.targetAmount}
onChange={handleChange}
min="100"
step="0.01"
/>

</div>

<div className="form-group">

<label>Already Saved</label>

<input
type="number"
name="savedAmount"
placeholder="0"
value={goal.savedAmount}
onChange={handleChange}
min="0"
step="0.01"
/>

</div>

<div className="form-group">

<label>Target Date</label>

<input
type="date"
name="targetDate"
value={goal.targetDate}
onChange={handleChange}
min={new Date().toISOString().split("T")[0]}
/>

</div>

</div>

<div className="modal-buttons">

<button
className="cancel-modal-btn"
onClick={onClose}
>

Cancel

</button>

<button
className="save-modal-btn"
onClick={handleSubmit}
>

Save Goal

</button>

</div>

</div>

</div>

);
};

export default GoalModal;