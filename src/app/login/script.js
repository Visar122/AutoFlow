const logInButton=document.getElementById('login');
const signUpButton=document.getElementById('signUp');
const container=document.getElementById('container')

logInButton.addEventListener('click',()=>{
     container.classList.add("right_panel-active");

     
});

signUpButton.addEventListener('click',()=>{
    container.classList.add("right_panel-active");
});

// JAva code 