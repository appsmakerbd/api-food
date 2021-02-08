//this function and API will call after clicking on search button 
function showResult(){
    const searchKey=document.getElementById('searchKey').value;
    //checking for null submit
    if(searchKey){
        //reset or refresh search-result-area (closeDiv used for hiding single item detail) 
        closeDiv();
        document.getElementById('search-result').innerHTML = "";
        
        const searchUrl=`https://themealdb.com/api/json/v1/1/search.php?s=${searchKey}`;
        fetch(searchUrl)
        .then(response => response.json())
        .then(data => searchResult(data.meals,searchKey))
        .catch((error) => {
            alert('We are unable to load data!! Please Check your Internet Connection! ');
        });
    }else{
        alert("You are trying to search empty Item!!");
    }    
}



//searchResult function declaration start
const searchResult=(foodItems,searchKey)=>{
    const searchHeadline=document.getElementById('search-result-headline');
    const itemName=document.getElementById('item-name');

    //Checking for null
   if(foodItems){
    // ForEach Start
    foodItems.forEach(singleItem => {
        const itemId=singleItem.idMeal;
        const itemName=singleItem.strMeal;
        const itemMedia=singleItem.strMealThumb;

        const searchResult=document.getElementById('search-result');
        const itemBox=document.createElement('div');
        itemBox.className='col-lg-3 col-md-3 col-sm-6 col-xs-12 item-box';
        const innerBox=`
            <div class="inner-box" onclick="showItemDetail(${itemId})">
                <div class="img-box">
                    <img src="${itemMedia}" alt="">
                </div>
                <h5>${itemName}</h5>
            </div>
        
        `;
        itemBox.innerHTML=innerBox;
        searchResult.appendChild(itemBox);
        });
        //showing headline
        searchHeadline.style.opacity=1;
        itemName.innerText=searchKey;
    }
    //If found Null
    else{
        searchHeadline.style.opacity=1;
        itemName.innerText=`${searchKey} was not found!!`;
    }
}
//searchResult function declaration ENDS



//Single Item  
//After Clicking on Item This Function will Call
const showItemDetail=itemId=>{
    const detaiUrl=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`;
    fetch(detaiUrl)
    .then(response => response.json())
    .then(data => itemDetail(data.meals[0]))
    .catch((error) => {
        alert('We are unable to load data!! Please Check your Internet Connection! ');
    });
}


//itemDetail Function Declare for showing Single Item
const itemDetail=details=>{
    const itemImage=details.strMealThumb;
    const itemName=details.strMeal;

    const itemDetailId=document.getElementById('item-detail');
    itemDetailId.style.display='block';

    const itemImageId=document.getElementById('item-detail-image');
    itemImageId.setAttribute('src',itemImage);

    const itemTitleId=document.getElementById('item-title');
    itemTitleId.innerText=itemName;
    const ul=document.getElementById('list');

    //reset previous list ITEM
    ul.innerHTML="";
    
    const ingredientList=20;
    //loop start
    for(let i=1; i<=ingredientList;i++){
        const ingredient=details[`strIngredient${i}`];
        if(ingredient){
            // console.log(ingredient);
            const li=document.createElement('li');
            li.innerHTML=`<i class="fas fa-check-square"></i> ${ingredient}`;
            ul.appendChild(li);
        }else{
            break;
        }
    }
    //loop ends
}


//For closing Single Item
function closeDiv(){
    const itemDetailId=document.getElementById('item-detail');
    itemDetailId.style.display='none';
    console.log('done');
}