async function allMenu(){
    try {
        const res = await fetch('data/data.json'); // Path to your JSON file
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        let menu = data.menu;

        // Append the menu items to the HTML
        $.each(menu, function(i, data) {
            $('#daftar-menu').append(`
              <div class="col-md-4">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="card-title">${data.nama}</h5>
                    <p class="card-text">${data.deskripsi}</p>
                    <h5 class="card-title">Rp. ${data.harga}</h5>
                    <a href="#" class="btn btn-primary">Pesan Sekarang</a>
                  </div>
                </div>
              </div>
            `);
        });
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// Call the function to load the menu on page load
allMenu();


$('.nav-link').on('click', function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h1').html(kategori);

    if (kategori == 'All menu'){
        allMenu();
        return;
    }
    

    $.getJSON('data/data.json', function(data){
        let menu = data.menu;
        let content = '';

        $.each(menu, function (i, data){
            if (data.kategori == kategori.toLowerCase()){
                content += 'div class="col-md-4"><div class="card mb-3"><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">' + data.deskripsi +'</p><h5 class="card-title">Rp. ' + data.harga + '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>';
            }
        });
        $('#daftar-menu').html(content);
    });
});