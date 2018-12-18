$(document).ready(function() {
    var price = 0;
    var comp = 0;



    $('.buyButton').click(function(){

    price = $('.main-price').html();
    comp = $('.stats-wrapper.price-wrapper').html();
    count = $('#quantity').val();
        let modal = "<div class='modalWrap'>" +
            "<div class='form'>" +
            "<div class='close'>" +
            "X" +
            "</div>" +
            "<div class='mess'>" +
            "<form action='/mailer/mail.php'>" +
            "<div class=\"ba-textInput tool \">\n" +
            "        <label style=\"font-size: 13px; color: rgba(51, 51, 51, 1);\n" +
            "    font-weight: normal;\">\n" +
            "    <span>\n" +
            "    Имя: *       </span>\n" +
            "    </label>\n" +
            "    <div class=\"container-icon\">\n" +
            "        <input name='name' type=\"text\" data-type=\"regular\" style=\"height: 50px;\n" +
            "    font-size: 13px; color: rgba(153, 153, 153, 1);\n" +
            "    background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(243, 243, 243, 1);\n" +
            "    border-radius: 2px;\" placeholder=\"\" required=\"\" name=\"10\">\n" +
            "    <div class=\"icons-cell\">\n" +
            "        <i style=\"font-size: 24px; color: rgba(217, 217, 217, 1)\" class=\"zmdi zmdi-account\"></i>\n" +
            "        </div>\n" +
            "        </div>\n" +
            "        </div>" +
            "<div class=\"ba-textInput tool \" style='margin-bottom: 10px;'>\n" +
            "    <label style=\"font-size: 13px; color: rgba(51, 51, 51, 1);\n" +
            "    \tfont-weight: normal;\">\n" +
            "    \t<span>\n" +
            "    \t\tТелефон: *        </span>\n" +
            "    </label>\n" +
            "    <div class=\"container-icon\">\n" +
            "\t\t<input name='phone' type=\"text\" data-type=\"regular\" style=\"height: 50px;\n" +
            "\t\t    font-size: 13px; color: rgba(153, 153, 153, 1);\n" +
            "\t\t    background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(243, 243, 243, 1);\n" +
            "\t\t    border-radius: 2px;\" placeholder=\"\" required=\"\" name=\"14\" >\n" +
            "\t    <div class=\"icons-cell\">\n" +
            "\t    \t<i style=\"font-size: 24px; color: rgba(217, 217, 217, 1)\" class=\"zmdi zmdi-phone\"></i>\n" +
            "\t\t</div>\n" +
            "\t</div>\n" +
            "</div>" +
            "<div class=\"ba-textInput tool \" style='margin-bottom: 10px;'>\n" +
            "    <label style=\"font-size: 13px; color: rgba(51, 51, 51, 1);\n" +
            "    \tfont-weight: normal;\">\n" +
            "    \t<span>\n" +
            "    \t\tE-mail:         </span>\n" +
            "    </label>\n" +
            "    <div class=\"container-icon\">\n" +
            "\t\t<input name='email' type=\"text\" data-type=\"regular\" style=\"height: 50px;\n" +
            "\t\t    font-size: 13px; color: rgba(153, 153, 153, 1);\n" +
            "\t\t    background-color: rgba(255, 255, 255, 1); border: 1px solid rgba(243, 243, 243, 1);\n" +
            "\t\t    border-radius: 2px;\" placeholder=\"\"  name=\"14\" >\n" +
            "\t    <div class=\"icons-cell\">\n" +
            "\t    \t<i style=\"font-size: 24px; color: rgba(217, 217, 217, 1)\" class=\"zmdi zmdi-email\"></i>\n" +
            "\t\t</div>\n" +
            "\t</div>\n" +
            "</div>" +
            "<div style='    text-align: right;\n" +
            "    margin-bottom: -24px;'>* обязательное поле</div>" +
            comp +
            "<p>Количество: " + count +
            "</p><p>Цена: "+ price +
            "</p><input type='hidden' name='comp' value='"+comp+"'>" +
            "<input type='hidden' name='price' value='"+price+"'>" +
            "<input type='hidden' name='count' value='"+count+"'>" +
            "<input type='hidden' name='head' value='"+ $('#app div:first-child h1').text() +"'>" +
            "<br><input style='    float: right;\n" +
            "    margin-top: -72px;' class='buyButton' type='submit' value='Отправить'>" +
            "</form>" +
            "</div>" +
            "</div>" +
            "<div class='overlay'></div>" +
            "</div>";
        $('body').append(modal);

    })

    $(document).on('click', '.modalWrap .overlay, .modalWrap .close', function(){

        $('.modalWrap').remove();

    });

    $(document).on('submit', '.modalWrap form', function(e){
        e.preventDefault();
    var self = $(this), data = self.serialize();
    $.post('/mailer/mail.php', data, function(data) {

        $('.modalWrap .mess').html('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');

    })

    });

});