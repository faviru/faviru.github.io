	var link = document.querySelector(".search-title-block");
	var searchForm = document.querySelector(".search-form");
	var form = searchForm.querySelector("form");
	var dateInField = form.querySelector("[name=date-in]")

	var adultPlus = form.querySelector("[name=plus-adults]");
	var adultMinus = form.querySelector("[name=minus-adults]");
	var adultField = form.querySelector("[name=adults]")

	var childPlus = form.querySelector("[name=plus-children]");
	var childMinus = form.querySelector("[name=minus-children]");
	var childField = form.querySelector("[name=children]")

	searchForm.classList.remove("search-form-show");
	adultField.setAttribute("disabled", true);
	childField.setAttribute("disabled", true);

	link.addEventListener("click", function(event) {
		event.preventDefault();
		if (searchForm.classList.contains("search-form-show")) {
			searchForm.classList.remove("search-form-show");
		} else {
			searchForm.classList.add("search-form-show");
			dateInField.focus();
		}
	});

	adultPlus.addEventListener("click", function(event){
		if(adultField.value == 8)
			return;

		adultField.value = ++adultField.value;
	});

	adultMinus.addEventListener("click", function(event){
		if(adultField.value == 1)
			return;

		adultField.value = --adultField.value;
	});

	childPlus.addEventListener("click", function(event){
		if(childField.value == 8)
			return;

		childField.value = ++childField.value;
	});

	childMinus.addEventListener("click", function(event){
		if(childField.value == 0)
			return;

		childField.value = --childField.value;
	});

	form.addEventListener("submit", function(event) {
		event.preventDefault();
	})

	function map() {
		new google.maps.Map(document.getElementById('map-block'), {
			center: {lat: 34.866217, lng: -111.765563},
			scrollwheel: false,
			zoom: 9,
			disableDefaultUI: true
		});
	}