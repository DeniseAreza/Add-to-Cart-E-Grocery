function loader() {

    var loader;
    loader = setTimeout(showPage, 2000);
    }
        
    function showPage() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("allContent").style.display = "block";
    }