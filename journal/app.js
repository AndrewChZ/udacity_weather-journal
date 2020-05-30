// An array holding all the possible content for the page, which will be randomly scrambled later
let possibleContent = [
    `
    <div class="content-section"><h2 id="header-regionalvariations">Regional Variations</h2>
        <p>In Kuala Trengganu, local chef Billy Chua combined Chinese fried rice (nasi goreng) with nasi lemak to create nasi lemak goreng, a dish he had invented as a teenager. He offered it on his menu at his eatery, Billi Kopitiam, in 2008, where it has become a hit.</p>

        <p>States on the east coast of Peninsular Malaysia such as Kelantan and Trengganu also have a similar dish known as nasi dagang (“trader’s/traveler’s rice”; although some suggest the name refers to “foreigners”). The coconut rice is a mixture of normal grain and pulut (glutinous rice), which is steamed with halba (an aromatic seed spice also known as fenugreek seeds), onions and ginger. It is eaten with ikan tongkol (tuna) curry or sometimes chicken curry. Indonesia has its nasi gurih and nasi kuning, which are cooked for special occasions and festivities. While both are cooked with coconut milk, the addition of spices, lemongrass and turmeric to the latter imparts a fragrance and distinct yellow colour to the nasi kuning.</p>        
    </div> 
    `,
    `
    <div class="content-section">
        <h2 id="header-origins">Origins</h2>
        <p>Nasi lemak was mentioned in a book "The Circumstances of Malay Life", written by Sir Richard Olof Winstedt in 1909. With roots in Malay culture and Malay cuisine, its name in Malay literally means "oily or fatty rice", but is taken in this context to mean "rich" or "creamy". The name is derived from the cooking process whereby rice is soaked in coconut cream and then the mixture steamed. The rice is normally cooked with pandan leaves that gives it a distinctive flavour.</p>
        <p>Traditionally, nasi lemak is served with a hot spicy sauce (sambal), and usually includes various garnishes, including fresh cucumber slices, small fried anchovies (ikan bilis), roasted peanuts, and hard-boiled or fried egg. As a more substantial meal, nasi lemak may also be served with an additional protein dish such as ayam goreng (fried chicken), sambal sotong (cuttlefish in chili), small fried fish, cockles, and on special occasions rendang daging (beef stewed in coconut milk and spices). Other accompaniments include stir fried water convolvulus (kangkong), and spicy pickled vegetables salad acar. Traditionally most of these accompaniments are spicy in nature.</p>
    </div>
    `,
    `
    <div class="content-section">
        <h2 id="header-nutritionallevel">Nutritional Level</h2>
        <p>In March 2016, nasi lemak was mentioned as one of the 10 healthy international breakfast foods by TIME magazine. However, this opinion may be misleading as the writer might have been referring to the dish's "healthier" and smaller version, and comparing it to the larger American breakfast (fried bacon, eggs, pancakes/hash browns). A single, full size serving of nasi lemak with additional fried chicken, meat or fish, can be between 800 and well over 1,000 calories. The savoury coconut milk-infused rice also contains saturated fat, an ingredient connected to health problems, including diabetes.</p>
    </div>
    `,
    `
    <div class="content-section">
        <h2 id="header-ingredients">Ingredients</h2>
        <div class="ingredients-list">
            <figure>
                <figcaption>Coconut Milk Rice</figcaption>
                <ul>
                    <li>1 kg rice preferably basmati rice, 5 1/2 cups</li>
                    <li>6 cups water</li>
                    <li>200 ml Thick coconut milk1 coconut</li>
                    <li>3 pandan leaves/screwpine leaves knotted and slightly bruised</li>
                </ul>
            </figure>
            <figure>
                <figcaption>Sambal Ikan Bilis (Chilli Anchovies)</figcaption>
                <ul>
                    <li>3 cups ikan bilis (dried anchovies)</li>
                    <li>1 cup oil</li>
                    <li>3 clove garlic</li>
                    <li>12 shallots</li>
                    <li>30 dried chillies or 150ml chilli paste</li>
                </ul>
            </figure>
            <figure>
                <figcaption>Other Ingredients</figcaption>
                <ul>
                    <li>6 eggs hard boiled, cut into halves</li>
                    <li>1 cucumber cut into slices</li>
                    <li>2 cups Peanuts</li>
                </ul>
            </figure>
        </div>
    </div>
    `,`
    <div class="content-section">
        <h2 id="header-directions">Directions</h2>
        <ol>
            <li>First rinse the rice and drained.</li>
            <li>Place the drained rice in a rice cooker.</li>
            <li>Pour 50ml (1/4) of the thick coconut milk into a measuring cup.</li>
            <li>Then dilute with some water.</li>
            <li>Add in salt and sugar and stir to mix.</li>
            <li>Pour the coconut milk mixture into the drained rice in the rice cooker.</li>
            <li>Add in additional water to make sure the volume of the watery coconut milk is the same as the rice in volume. (Altogether is about 6 cups).	</li>
            <li>Lastly add in crushed ginger, lemongrass and screw pine leaves.</li>
            <li>Switch on the rice cooker and cook the rice. </li>
            <li>When the rice reaches warming stage, add the balance (150ml) of the thick coconut milk.	</li>
            <li>Stir the rice. Close the lid and continue cooking until done. </li>
            <li>Fluff up the rice and serve it hot.</li>
        </ol>
    </div>
    `
];

shuffleContent(); //runs the function to shuffle the content
let listOfHeaders = document.querySelectorAll("h2"); //this variable holds all h2 which will be used to generate the nav
createNav(); //nav is generated based on the h2 in the content sections
colourAlternateSections(); //function to colour all the odd content sections
listOfHeaders = document.querySelectorAll("h2"); // The value for listOfHeaders is redefined because the DOM was manipulated with new nodes to highlight the odd sections
let listOfNavLi = document.querySelectorAll("nav ul li"); //This holds all the <li> item in the nav which is used to help highlight the active section
let lastScrollTop = 0; //A variable used in detecting scroll direction

// Got this reference from SO "detecting scroll directions" https://stackoverflow.com/a/31223774
window.addEventListener("scroll", function(){
   let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   console.log(`--------------------------`);
   console.log(`st is ${st}`);
   console.log(`Distance to first header's top is ${listOfHeaders[1].getBoundingClientRect().top}`);
   console.log(`--------------------------`);
    //If user is scrolling down AND the first header comes into view
   if (st > lastScrollTop){
        document.querySelector("nav").style.opacity = 0; 
   } else {
        document.querySelector("nav").style.opacity = 1;
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

function shuffleContent() {
    let contentSectionGroup = document.querySelector(".content-section-group");
    contentSectionGroup.innerHTML = shuffle(possibleContent);
}

// A function to shuffle the array, based on the Fisher-Yates Shuffle https://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    // console.log(array);
    return array;
}

// Colours alternate content section
function colourAlternateSections() {
    let listOfContentSection = document.getElementsByClassName("content-section");

    for (i = 0; i < listOfContentSection.length; i++) {
        if (isEven(i) == false) {
            // let oldParentNode = listOfContentSection[i].parentNode;
            let newParentNode = document.createElement("div");
            newParentNode.className = "even-section";
            let newParentNodeContent = listOfContentSection[i].cloneNode(true);
            newParentNode.appendChild(newParentNodeContent);
            listOfContentSection[i].parentNode.replaceChild(newParentNode, listOfContentSection[i]);
            console.log(newParentNode);
        }
    }

    console.log(listOfContentSection.length);
}

// Checks if the provided argument is true
function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

// Dynamically creates the nav based on the headers in the content sections
function createNav() {
    let fragment = document.createDocumentFragment();
    let navTitle = [];
    let liItems;

    // Use the headers to populate build the string for 
    for (i = 0; i < listOfHeaders.length; i++) {
        let navhref;
        navhref = "#header-" + listOfHeaders[i].innerHTML.toLowerCase().replace(/\s/g, '');
        navTitle[i] = {content: listOfHeaders[i].innerHTML,
                        href: navhref};
    }
    // return navTitle;

    for (i = 0; i < listOfHeaders.length; i++) {
        liItems = document.createElement(`li`);
        liItems.innerHTML = `<a href=${navTitle[i].href}>${navTitle[i].content}</a>`
        fragment.appendChild(liItems);
        // <li><a href="#header-overview">Overview</a></li>
    }
    // console.log(`The navTitle length is ${navTitle.length}`);
    // console.log(`The listOfHeaders length is ${listOfHeaders.length}`);
    // console.log(`----- HTML Fragment below -----`);
    // console.log(fragment);
    document.querySelector("nav ul").appendChild(fragment);
}

// Does a smooth scroll to the selected destination. Disables the default behaviour.
function scrollToSection(evt) {
    evt.preventDefault();
    console.log(`You've just clicked ${evt.target.textContent}`);
    console.log(evt.target.innerHTML);
    if (evt.target.innerHTML == "Overview") {
        document.querySelector('#header-image').scrollIntoView({
            behavior: 'smooth'
        });
    } else {
        document.querySelector(evt.target.getAttribute('href')).parentNode.scrollIntoView({
            behavior: 'smooth'
        });
    }  
}

// Adds the function which enables a smooth scroll when user clicks on the nav
document.querySelector("nav").addEventListener('click', scrollToSection);

// Reports the distance to the top of the document for the specified section
function reportHeaderDistanceToTop(x) {
    console.log(`The section "${listOfHeaders[x].textContent}" is ${listOfHeaders[x].getBoundingClientRect().top} away from the top of the document.`);
    return;
}

// This determines which section should be highlighted
window.addEventListener('scroll', function() {
    // If the first item should be selected
    if(listOfHeaders[0].getBoundingClientRect().top < listOfHeaders[1].getBoundingClientRect().top
        && listOfHeaders[1].getBoundingClientRect().top > 200)
    {
        listOfNavLi[0].className= "focused";
        listOfNavLi[1].className= "next";
        listOfNavLi[2].className= "hide";
        listOfNavLi[3].className= "hide";
        listOfNavLi[4].className= "hide";
        listOfNavLi[5].className= "hide";
        console.log(`0. ${listOfHeaders[0].textContent} should be highlighted`);
    // If the second item should be selected
    } else if (listOfHeaders[1].getBoundingClientRect().top > 0 
                && listOfHeaders[1].getBoundingClientRect().top < listOfHeaders[2].getBoundingClientRect().top) {
        listOfNavLi[0].className= "previous";
        listOfNavLi[1].className= "focused";
        listOfNavLi[2].className= "next";
        listOfNavLi[3].className= "hide";
        listOfNavLi[4].className= "hide";
        listOfNavLi[5].className= "hide";
        console.log(`1. ${listOfHeaders[1].textContent} should be highlighted`);
    // If the third item should be selected
    } else if (listOfHeaders[2].getBoundingClientRect().top > 0 
                && listOfHeaders[2].getBoundingClientRect().top < listOfHeaders[3].getBoundingClientRect().top) {
        listOfNavLi[0].className= "hide";
        listOfNavLi[1].className= "previous";
        listOfNavLi[2].className= "focused";
        listOfNavLi[3].className= "next";
        listOfNavLi[4].className= "hide";
        listOfNavLi[5].className= "hide";
        console.log(`2. ${listOfHeaders[2].textContent} should be highlighted`);
    // If the fourth item should be selected
    } else if (listOfHeaders[3].getBoundingClientRect().top > 0 
                && listOfHeaders[3].getBoundingClientRect().top < listOfHeaders[4].getBoundingClientRect().top) {
        listOfNavLi[0].className= "hide";
        listOfNavLi[1].className= "hide";
        listOfNavLi[2].className= "previous";
        listOfNavLi[3].className= "focused";
        listOfNavLi[4].className= "next";
        listOfNavLi[5].className= "hide";
        console.log(`3. ${listOfHeaders[3].textContent} should be highlighted`);
    // If the fifth item should be selected
    } else if (listOfHeaders[4].getBoundingClientRect().top > 0 
                && listOfHeaders[4].getBoundingClientRect().top < listOfHeaders[5].getBoundingClientRect().top) {
        listOfNavLi[0].className= "hide";
        listOfNavLi[1].className= "hide";
        listOfNavLi[2].className= "hide";
        listOfNavLi[3].className= "previous";
        listOfNavLi[4].className= "focused";
        listOfNavLi[5].className= "next";
        console.log(`4. ${listOfHeaders[4].textContent} should be highlighted`);
    // Else if I don't know what should be selected
    } else {
        console.log(`!! I can't determine which should be highlighted !!`);
    }
})