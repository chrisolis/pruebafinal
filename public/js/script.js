window.onload = function () {
    bootlint.showLintReportForCurrentDocument([], {
        hasProblems: false,
        problemFree: false
    });

    $('[data-toggle="tooltip"]').tooltip();

    function formatDate(date) {
        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
    }

    var currentDate = formatDate(new Date());

    $(".due-date-button").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: "bottom right"
    });

    $(".due-date-button").on("click", function (event) {
        $(".due-date-button")
            .datepicker("show")
            .on("changeDate", function (dateChangeEvent) {
                $(".due-date-button").datepicker("hide");
                $(".due-date-label").text(formatDate(dateChangeEvent.date));
            });
    });


    /*$("#square").on("click", function (e){
        if (this.attr("data-state") == "still"){
            alert("fun")
            let h = $("img").attr("number")
            alert(h)
            $("img").attr("src",$("img").attr("data-animate"))
            $("img").attr("data-state","animate")
        }
    })*/
    /*$("#taskList").on("click",".square", function(e){
        //alert("HOLA")
        let state = $(this).attr("data-activated")

        if (state==='false') {
            $(this).attr("class", $(this).attr("data-classTrue"))
            $(this).attr("data-activated", "true")
        } else{
            $(this).attr("class", $(this).attr("data-classFalse"))
            $(this).attr("data-activated", "false")
        }
        
    })*/
    

};