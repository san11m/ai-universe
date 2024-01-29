const loadAiUniverse = async()=>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayCards(data.data);
    
}
const displayCards = cards =>{
    const cardsContainer = document.getElementById('cards-container');
    // const seeMore= document.getElementById('see-more').addEventListener('click',function(){})
    const seeMore= document.getElementById('btn-see-more');
    if(cards.tools.length>6){
      cards.tools = cards.tools.slice(0,6);
      seeMore.classList.remove('d-none');

    }
    else{
      seeMore.classList.add('d-none');
      

    }
      cards.tools = cards.tools.slice(0,6);
    cards.tools.forEach(card =>{
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML =`
        <div class="card h-100">
                    <img src="${card.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Features</h5>
                      <p id="feature-div" class="card-text">
                      ${card.features}
                      </p>
                    </div>
                    <div class="card-footer">
                    <h5 class="card-title">${card.name}</h5>
                    <div class="d-flex">
                    <small class="text-muted me-lg-5">
                        <i class="fa fa-calendar" aria-hidden="true"></i> ${card.published_in
                        }</small>
                        <button onclick="loadCardDetails('${card.id}')" type="button" class="btn btn-danger ms-lg-5" data-bs-toggle="modal" data-bs-target="#cardModal"><i class="fa-solid fa-arrow-right"></i></button>
                        
                  </div>
                      
                    </div>
                  </div>
        `;
        
        cardsContainer.appendChild(cardDiv);


        //  const featureContainer = document.getElementById('feature-div');
        //  card.tools.features.forEach(featureName=>{

        // const featureDiv = document.createElement('ol');
        // featureDiv.innerHTML=`<li>${featureName.features}</li>`;
        // featureContainer.appendChild('featureDiv');
        // })


        
    });
    //stop loader

}

// const toggleSpinner = isLoading =>{
//   const loaderSection = document.getElementById('loader');
//   if(isLoading){
//     loaderSection.classList.remove('d-none')
//   }
// }

const loadCardDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res =await fetch(url);
  const data = await res.json();
  displayCardDetails(data);
  console.log(data);
}

const displayCardDetails = cardModal =>{
  const modalDescription= document.getElementById('modal-descriptions');
  console.log(cardModal.data);
  modalDescription.innerText= cardModal.data.description;
  const modalPlan1= document.getElementById('modal-plan1');
  modalPlan1.innerText= cardModal.data.pricing[0].plan;
  const modalPlan1Price= document.getElementById('modal-plan1-price');
  modalPlan1Price.innerText= cardModal.data.pricing[0].price;
  const modalPlan2= document.getElementById('modal-plan2');
  modalPlan2.innerText= cardModal.data.pricing[1].plan;
  const modalPlan2Price= document.getElementById('modal-plan2-price');
  modalPlan2Price.innerText= cardModal.data.pricing[1].price;
  const modalPlan3= document.getElementById('modal-plan3');
  modalPlan3.innerText= cardModal.data.pricing[2].plan;
  const modalPlan3Price= document.getElementById('modal-plan3-price');
  modalPlan3Price.innerText= cardModal.data.pricing[2].price;

  //  const modalFeatures= document.getElementById('modal-features');
  // //modalFeatures.innerText= cardModal.data.features.feature_name;
  //  cardModal.data.features.forEach(cardElements=>{
  //    const featuresDiv =document.createElement('ul');
  //   featuresDiv.innerHTML=`<li>${cardElements}</li>`;
  //    modalFeatures.appendChild(featuresDiv);
  //  }) 

  const modalIntegrations= document.getElementById('modal-integrations');
  //modalIntegrations.innerText= cardModal.data.integrations;
  cardModal.data.integrations.forEach(element=>{
    const integrationsDiv =document.createElement('ul');
    integrationsDiv.innerHTML=`<li>${element}</li>`;
    modalIntegrations.appendChild(integrationsDiv);

  }) 

  const modalRight= document.getElementById('modal-card-right');
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('card');
  modalDiv.innerHTML =`
  
             <img src="${cardModal.data.image_link[0]}" class="card-img-top position-relative" alt="...">
             <button class="bg-danger position-absolute top-0 end-0 text-light mt-2 me-2 btn"> ${cardModal.data.accuracy.score*100 ? cardModal.data.accuracy.score*100 :'No accuracy Found'}
              % accuracy</button>

            
                
                <div class="card-body">
                  <h5 class="card-title d-flex align-items-center justify-content-center">${cardModal.data.input_output_examples[0].input}</h5>
                  <p class="card-text d-flex align-items-center justify-content-center"> ${cardModal.data.input_output_examples[0].output}
                  </p>
                </div>      
        `;
        modalRight.appendChild(modalDiv);



  console.log(cardModal);
}

 loadCardDetails();

 document.getElementById('btn-see-more').addEventListener('click',function(){
  
  //loadAiUniverse(12);
 })

loadAiUniverse();
