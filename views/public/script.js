let observer = new IntersectionObserver((e)=>{
    e.forEach((sec)=>{
        if(sec.isIntersecting)
        {sec.target.style.opacity=1;} 
        else{sec.target.style.opacity=0;}       
})
})
let section = document.querySelectorAll('section')
for(i=0; i<5; i++)
{
observer.observe(section[i])
}


const sections = document.querySelectorAll('section[id]')

function scrollActive()
{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 450;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.container-fluid a[href*=' + sectionId + ']').classList.add('underline')
        }else{
            document.querySelector('.container-fluid a[href*=' + sectionId + ']').classList.remove('underline')
        }
    })
}
window.addEventListener('scroll', scrollActive)