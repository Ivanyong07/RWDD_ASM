function swap(){
    setTimeout(() => {

    document.querySelectorAll('.band').forEach(b => {
            document.body.classList.add('no-scroll');
            b.classList.add('play');
        });
    }, 2000);


    setTimeout(() => {
        document.querySelectorAll('.band').forEach(b => {
            b.classList.remove('play');

            document.getElementById('swap').style.display = 'none';
            b.classList.add('play-back');
        })
    }, 3500)
}
swap()

