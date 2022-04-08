$(".modal").hide()
$("#scroll-up").click(() => {
    $(window).scrollTop(0);
})
var languageID;
const activeLanguage = (lang) => {
    if (lang == "en"){
        languageID = "en"
        $("#id").html("Bahasa (Indonesia)")
        $("#en").html('<span class="w-4/5">English (United States)</span><span class="w-1/5 flex justify-end items-center"><img class="w-4" src="assets/svg/centang.svg" alt="" srcset=""></span>')
        $("#en").addClass("flex");
        $("#id").removeClass("flex");
        $("#language-ticker").text("EN");
        $("#language-flag-icon").attr("src", "assets/svg/en.svg")
        $("[lang=\"id\"]").hide()
        $("[lang=\"en\"]").show()
    }else if(lang == "id"){
        languageID = "id"
        $("#en").html("English (United States)")
        $("#id").html('<span class="w-4/5">Bahasa (Indonesia)</span><span class="w-1/5 flex justify-end items-center"><img class="w-4" src="assets/svg/centang.svg" alt="" srcset=""></span>')
        $("#id").addClass("flex");
        $("#en").removeClass("flex");
        $("#language-ticker").text("ID");
        $("#language-flag-icon").attr("src", "assets/svg/id.svg")
        $("[lang=\"en\"]").hide()
        $("[lang=\"id\"]").show()
    }
}
const cookieMiddleware = () => {
    if($.cookie("lang")){
        if($.cookie("lang") == "en"){
            activeLanguage("en");
        }
        if($.cookie("lang") == "id"){
            activeLanguage("id");

        }
    }else{
        activeLanguage("en");

    }
}
$("#en").click(() => {
    $.cookie("lang", "en");
    activeLanguage("en");
    $("#bahasa").hide()
})
$("#id").click(() => {
    $.cookie("lang", "id");
    activeLanguage("id");
    $("#bahasa").hide()
})
cookieMiddleware();
function slider(){
    var default_slide = $("#card-slider").children()[0]
    var default_progress = $("#slider-progress").children()[0]
    $("#max_slide").text("0"+$("#card-slider").children().length)
    $("#next-slide").click(() => {
        default_slide = $(default_slide).next()
        console.log(default_slide.index())
        slider_childern = $("#card-slider").children()
        if(default_slide.index() == -1){
            default_slide = $(slider_childern[0])
        }
        $(".card-item").hide()
        default_slide.show()
    
        default_progress = $(default_progress).next()
        progress_childern = $("#slider-progress").children()
        if(default_progress.index() == -1){
            default_progress = $(progress_childern[0])
        }
        $(".progress").removeClass("border-t-4")
        default_progress.addClass("border-t-4")
        $("#current_slide").text("0"+(default_slide.index()+1))
    })
    $("#prev-slide").click(() => {
        default_slide = $(default_slide).prev()
        slider_childern = $("#card-slider").children()
        if(default_slide.index() == -1){
            console.log(default_slide.index())
            default_slide = $(slider_childern[slider_childern.length-1])
            console.log(default_slide.index())
        }
        $(".card-item").hide()
        default_slide.show()
    
        default_progress = $(default_progress).prev()
        progress_childern = $("#slider-progress").children()
        if(default_progress.index() == -1){
            default_progress = $(progress_childern[progress_childern.length-1])
        }
        $(".progress").removeClass("border-t-4")
        default_progress.addClass("border-t-4")
        $("#current_slide").text("0"+(default_slide.index()+1))
    })
}
slider()
const activeMenu = (id) => {
    $(".menu-item").removeClass("border-b-2")
    $(".menu-item").removeClass("border-orange")
    $(id).addClass("border-b-2")
    $(id).addClass("border-orange")
}
$("#bahasa").hide()
$("#bahasa-click").click(() =>{
    $("#bahasa").toggle()
})
$(window).scroll(function() {
    var navbarHeight = $(".navbar").height()
    console.log($(this).scrollTop())
    if($(this).scrollTop() > 0){
        console.log("Test")
        $(".navbar").removeClass("absolute")
        $(".navbar").removeClass("bg-gradient-linear")
        $(".navbar").addClass("fixed")
        $(".navbar").addClass("bg-darker-red")
        $(".navbar").addClass("black-shadow")
    }else{
        $(".navbar").removeClass("black-shadow")
        $(".navbar").addClass("absolute")
        $(".navbar").addClass("bg-gradient-linear")
        $(".navbar").removeClass("fixed")
        $(".navbar").removeClass("bg-darker-red")
    }
})

$(".button-close").click(() => {$(".modal").hide()})
var app = Sammy('#main', function() {
    this.get("/", function(){
        $("#loading-overlay").show()
        $("#main").load("home.html", () => {
            cookieMiddleware();
            AOS.init();
            slider()
            $(".open-modal").click(function(){
                console.log(1)
                var modal_id = $(this).data("modal-id")
                console.log($($($("#"+modal_id).children()[1]).children()[0]).children()[1].play())
                $("#"+modal_id).show()

            })
            $(".button-close").click(() => {
                $(".modal").hide()
                $("video")[0].pause()
            })
            $("#loading-overlay").hide()
        })
    })
    this.get("/index.html", function(){
        $("#loading-overlay").show()
        $("#main").load("home.html", () => {
            cookieMiddleware();
            AOS.init();
            slider()
            $(".open-modal").click(function(){
                console.log(1)
                var modal_id = $(this).data("modal-id")
                console.log($($($("#"+modal_id).children()[1]).children()[0]).children()[1].play())
                $("#"+modal_id).show()

            })
            $(".button-close").click(() => {
                $(".modal").hide()
                $("video")[0].pause()
            })
            $("#loading-overlay").hide()
        })
    })
    this.get('#/', function() {
        $("#loading-overlay").show()
        $("#main").load("home.html", () => {
            cookieMiddleware();
            AOS.init();
            slider()
            $(".open-modal").click(function(){
                console.log(1)
                var modal_id = $(this).data("modal-id")
                console.log($($($("#"+modal_id).children()[1]).children()[0]).children()[1].play())
                $("#"+modal_id).show()

            })
            $(".button-close").click(() => {
                $(".modal").hide()
                $("video")[0].pause()
            })
            $("#loading-overlay").hide()
        })
    });
    this.get('#/explore/jogja', function() {
        $("#loading-overlay").show()
        cookieMiddleware();
        $("#main").load("explore.html", () => {
            cookieMiddleware();
            $("#dropdown-navigator option[lang="+languageID+"][value=1]").attr('selected','selected');
            $("#main-explore").load("sekilas.html", () =>{
                dropDownFunc()
                cookieMiddleware();
                $("#loading-overlay").hide()
            })
        });
    });
    this.get('#/explore/wisata', function() {
        $("#loading-overlay").show()
        cookieMiddleware();
        $("#main").load("explore.html", () => {
            cookieMiddleware();
            $(".modal").hide()
            $("#dropdown-navigator option[lang="+languageID+"][value=3]").attr('selected','selected');
            $("#main-explore").load("wisata.html", () => {
                dropDownFunc()
                cookieMiddleware();
                $(".open-modal").click(function(){
                    console.log(1)
                    var modal_id = $(this).data("modal-id")
                    $("#"+modal_id).show()
                })
                $(".button-close").click(() => {$(".modal").hide()})
                $(".tab-menu").click(function(){
                    console.log(1)
                    $(".tab-menu").removeClass("bg-pink-2")
                    $(".tab-menu").addClass("text-gray-400")
                    $(".tab-menu").addClass("font-normal")
                    $(".tab-menu").removeClass("text-white")
                    $(".tab-menu").removeClass("font-bold")
                    $(this).removeClass("font-normal")
                    $(this).addClass("font-bold")
                    $(this).addClass("bg-pink-2")
                    $(this).removeClass("text-gray-400")
                    $(this).addClass("text-white")
                    var tab_id = $(this).data("tab-id")
                    $(".tab").hide()
                    $("#"+tab_id).show()
                })
                $("#loading-overlay").hide()
            })
        });
    });
    this.get('#/explore/kuliner', function() {
        $("#loading-overlay").show()
        cookieMiddleware();
        $("#main").load("explore.html", () => {
            cookieMiddleware();
            $(".modal").hide()
            $("#dropdown-navigator option[lang="+languageID+"][value=2]").attr('selected','selected');
            dropDownFunc()
            $("#main-explore").load("kuliner.html", () => {
                cookieMiddleware();
                $(".open-modal").click(function(){
                    console.log(1)
                    var modal_id = $(this).data("modal-id")
                    $("#"+modal_id).show()
                })
                $(".button-close").click(() => {$(".modal").hide()})
                $(".tab-menu").click(function(){
                    console.log(1)
                    $(".tab-menu").removeClass("bg-pink-2")
                    $(".tab-menu").addClass("text-gray-400")
                    $(".tab-menu").addClass("font-normal")
                    $(".tab-menu").removeClass("text-white")
                    $(".tab-menu").removeClass("font-bold")
                    $(this).removeClass("font-normal")
                    $(this).addClass("font-bold")
                    $(this).addClass("bg-pink-2")
                    $(this).removeClass("text-gray-400")
                    $(this).addClass("text-white")
                    var tab_id = $(this).data("tab-id")
                    $(".tab").hide()
                    $("#"+tab_id).show()
                })
                $("#loading-overlay").hide()
            })
        });
    });
    this.get('#/explore/budaya', function() {
        $("#loading-overlay").show()
        cookieMiddleware();
        $("#main").load("explore.html", () => {
            cookieMiddleware();
            $(".modal").hide()
            $("#dropdown-navigator option[lang="+languageID+"][value=4]").attr('selected','selected');
            dropDownFunc()
            $("#main-explore").load("budaya.html", () =>{
                cookieMiddleware();

                $(".open-modal").click(function(){
                    console.log(1)
                    var modal_id = $(this).data("modal-id")
                    console.log($($($("#"+modal_id).children()[1]).children()[0]).children()[1].play())
                    $("#"+modal_id).show()
    
                })
                $(".button-close").click(function(){
                    $(".modal").hide()
                    $(this).next()[0].pause()
                    console.log($("video")[0])
                })
                $("#loading-overlay").hide()
            })
        });
    });
    this.get('#/explore/transportasi', function() {
        $("#loading-overlay").show()
        cookieMiddleware();
        $("#main").load("explore.html", () => {
            cookieMiddleware();
            $(".modal").hide()
            $("#dropdown-navigator option[lang="+languageID+"][value=5]").attr('selected','selected');
            dropDownFunc()
            $("#main-explore").load("transportasi.html", () => {
                cookieMiddleware();
                $("#loading-overlay").hide()
            })
        });
    });
    this.get('#/explore/souvenir', function() {
        $("#loading-overlay").show()
        cookieMiddleware();
        $("#main").load("explore.html", () => {
            cookieMiddleware();
            $(".modal").hide()
            $("#dropdown-navigator option[lang="+languageID+"][value=6]").attr('selected','selected');
            
            $("#main-explore").load("souvenir.html", () => {
                dropDownFunc()
                cookieMiddleware();
                $("#loading-overlay").hide()
            })
        });
    });
    this.get('#/kontak', function() {
        $("#loading-overlay").show()
        $("#main").load("kontak.html", () => {
            cookieMiddleware();
            $("#loading-overlay").hide()
        });
    });
    this.get('#/berita', function() {
        $("#loading-overlay").show()
        $("#main").load("berita.html", () => {
            cookieMiddleware();
            $(".modal").hide()
            dropDownFunc()
            $("#loading-overlay").hide()
        })
    })
    }).run();
function dropDownFunc(){
    var valueDrop = $("#dropdown-navigator").find(':selected').val();
    console.log(valueDrop);
    $("#en").click(() => {
        $("#dropdown-navigator").find(':selected').attr('selected',null)
        $("#dropdown-navigator option[lang="+languageID+"][value="+valueDrop+"][lang=en]").attr('selected','selected');
        
    })
    $("#id").click(() => {
        $("#dropdown-navigator").find(':selected').attr('selected',null)
        $("#dropdown-navigator option[lang="+languageID+"][value="+valueDrop+"][lang=id]").attr('selected','selected');
    })
    console.log()
    $("#dropdown-navigator").on('change', function() {
        console.log(this.value)
        if(this.value == 1){

            window.location.hash = "/explore/jogja"
        }else if (this.value == 2){

            window.location.hash = "/explore/kuliner"
        }else if (this.value == 3){
            window.location.hash = "/explore/wisata"
        }else if (this.value == 4){
            window.location.hash = "/explore/budaya"
        }else if (this.value == 5){
            window.location.hash = "/explore/transportasi"
        }else if (this.value == 6){
            window.location.hash = "/explore/souvenir"
        }
    });
    
}
