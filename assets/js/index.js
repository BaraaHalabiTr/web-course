$('#dismiss').click(() => {
    $('#backdrop').css({'display': 'none'});
});

const openDialog = (name, nationality, age) => {
    $('#name').text(name);
    $('#nationality').text(nationality);
    $('#age').text(age);
    $('#backdrop').css({'display': 'flex'});
}