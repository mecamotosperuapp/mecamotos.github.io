
jQuery(document).ready(function ($) {
    "use strict";

    //Contact
    $('form.contactForm').submit(function () {

        var f = $(this).find('.form-group'),
            ferror = false,
            emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

        f.children('input').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') { ferror = ierror = true; }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) { ferror = ierror = true; }
                        break;

                    case 'email':
                        if (!emailExp.test(i.val())) { ferror = ierror = true; }
                        break;

                    case 'checked':
                        if (!i.attr('checked')) { ferror = ierror = true; }
                        break;

                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test(i.val())) { ferror = ierror = true; }
                        break;
                }
                i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        f.children('textarea').each(function () { // run all inputs

            var i = $(this); // current input
            var rule = i.attr('data-rule');

            if (rule !== undefined) {
                var ierror = false; // error flag for current input
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substr(pos + 1, rule.length);
                    rule = rule.substr(0, pos);
                } else {
                    rule = rule.substr(pos + 1, rule.length);
                }

                switch (rule) {
                    case 'required':
                        if (i.val() === '') { ferror = ierror = true; }
                        break;

                    case 'minlen':
                        if (i.val().length < parseInt(exp)) { ferror = ierror = true; }
                        break;
                }
                i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
            }
        });
        if (ferror) return false;
        else {
            var str = $(this).serialize()
            var customerName = document.getElementById("name").value;
            var customerLastname = document.getElementById("lastname").value;
            var district = "-";
            var contactEmail = document.getElementById("email").value;
            var contactPhone = document.getElementById("telephone").value;
            var contactAddress = document.getElementById("subject").value;
            var documentType = "DNI";
            var identityDocument = document.getElementById("document").value;
            var concatObservation = document.getElementById("observation").value;
            var username = "aaguinaga";

            var json =  {
                customerName: customerName,
                customerLastname: customerLastname,
                district: district,
                contactEmail: contactEmail,
                contactPhone: contactPhone,
                contactAddress: contactAddress,
                documentType: documentType,
                identityDocument:identityDocument,
                concatObservation: concatObservation,
                username: username
            }

            console.log(json)
        };
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/customers",
            data:  JSON.stringify(json),
            contentType: 'application/json',
            dataType: 'json',
            success: function (msg) {
                // alert(msg);
                if (msg == 'OK') {
                    $("#sendmessage").addClass("show");
                    $("#errormessage").removeClass("show");
                }
                else {
                    $("#sendmessage").removeClass("show");
                    $("#errormessage").addClass("show");
                    $('#errormessage').html(msg);
                }

            }
        });
        return false;
    });

});