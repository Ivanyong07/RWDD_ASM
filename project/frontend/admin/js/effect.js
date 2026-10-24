const band = document.querySelectorAll('.band');
const swap_element = document.getElementById('swap');

function swap(){
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');


    band.forEach(b => b.classList.add('play'));
    document.body.classList.add('no-scroll');

    setTimeout(() => {

        band.forEach(b => {
            b.classList.remove('play');
            b.classList.add('play-back');
        })
    }, 1000);

    setTimeout(() => {
        swap_element.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    }, 2000);
}

swap();