      
      let ListSuggestionKeywords = ['Java', 'Python','BrainFuck']
      let ListSuggestionElements = ''
      let ListSelectedLanguages = ''
      let SelectedSuggestionElement = 0

      function clearSuggestion() {
        while(ListSuggestionElements.children.length>0){
          ListSuggestionElements.removeChild(ListSuggestionElements.firstElementChild)
        }
        ListSuggestionElements.parentNode.style.display='none'
      }

      function addSuggestion() {
        for(a of ListSuggestionKeywords){
          newElem = document.createElement('li')
          newElem.innerHTML=a
          newElem.setAttribute('onclick','addSelectedLanguage("'+a+'")')
          ListSuggestionElements.appendChild(newElem)
        }
        ListSuggestionKeywords.length>0 ?
        ListSuggestionElements.parentNode.style.display='block' : null
      }

      function showSuggestion() {
        ListSuggestionElements = document.querySelector(".Suggestion").firstElementChild
        clearSuggestion()
        addSuggestion()
        ListSuggestionElements.firstElementChild.setAttribute('class', 'Suggestion__item--selected')
        SelectedSuggestionElement = 0
      }

      function addSelectedLanguage(value) {
        ListSelectedLanguages = document.querySelector(".SelectedLanguage").firstElementChild
        for(a of ListSelectedLanguages.children){
          if (a.innerHTML==value) {
            ListSelectedLanguages.removeChild(a)
            break
          }
        }
        if(ListSelectedLanguages.children.length>=5){
          ListSelectedLanguages.removeChild(ListSelectedLanguages.firstElementChild)
        }
        newElem = document.createElement('li')
        newElem.innerHTML=value
        newElem.setAttribute('onclick','document.querySelector(".SearchInput__input").value="'+value+'"')
        newElem.style.userSelect='none'
        newElem.style.marginLeft='5px'
        ListSelectedLanguages.appendChild(newElem)
      }

      function doKeyDownEvent(value) {
        
        switch(event.keyCode) {
          /* Enter */
          case 13 : 
          document.querySelector('.SearchInput__input').value=ListSuggestionKeywords[SelectedSuggestionElement]
          alert(ListSuggestionKeywords[SelectedSuggestionElement])&event.preventDefault()
          break
          
          /* Left */
          case 37 : break

          /* Up */
          case 38 : 
          console.log(ListSuggestionElements.children)
          if(SelectedSuggestionElement>0) {
            SelectedSuggestionElement-=1
            for(a of ListSuggestionElements.children){
              a.setAttribute('class', '')
            }
            ListSuggestionElements.children[SelectedSuggestionElement].setAttribute('class','Suggestion__item--selected')
          }
          break

          /* Right */
          case 39 : break

          /* Down */
          case 40 : 
          console.log(ListSuggestionElements.children)
          if(SelectedSuggestionElement<ListSuggestionKeywords.length-1) {
            SelectedSuggestionElement+=1
            for(a of ListSuggestionElements.children){
              a.setAttribute('class', '')
            }
            ListSuggestionElements.children[SelectedSuggestionElement].setAttribute('class','Suggestion__item--selected')
          }
          break

          default : callFetchAPI(value)&showSuggestion()
        }        
      }

      function callFetchAPI(value) {
        console.log(value)
        fetch("https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword="+value, {
            method: "get"
        }).then(resp => {
            const respJson = resp.json()
            //console.log("resp", resp, respJson)
            return respJson
        }).then(data => {
            console.log("data", data)
            ListSuggestionKeywords = data
            showSuggestion()
        }).catch(excResp => {
            console.log(excResp)
        })
      }
