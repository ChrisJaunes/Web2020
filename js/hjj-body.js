function imageBig(src, width, height) {
    $('#myModal').on('show.bs.modal', function () {
        console.log(src);
        var modal = $(this);
        modal.find('.modal-dialog').css({'margin-left':(document.body.clientWidth - width*2)/2 + 'px'})
        modal.find('.modal-body #image').attr("src", src)
            .attr("width", width*2)
            .attr("height", height*2);
    });
}