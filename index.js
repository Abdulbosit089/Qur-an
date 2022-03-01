let surahName = document.querySelector("#surahName")
let input = document.querySelector("#inputElement")
let btn = document.querySelector("#readAll")
let ul = document.querySelector("#list")
let allAudios

input.addEventListener('keyup',(event)=>{
    if(input.value>0 && input.value<115 && event.keyCode == 13){
        ul.innerHTML = null
        ;(async () => {
            let response = await fetch(`https://api.quran.sutanlab.id/surah/${input.value}`)
            let translationUz = await fetch(`https://quranenc.com/api/translation/sura/uzbek_mansour/${input.value}`)
            translationUz = await translationUz.json()
            response = await response.json()
            let audioEl = document.createElement('audio')

            surahName.textContent = response.data.name.transliteration.en
            
            btn.addEventListener('click',()=>{
                for(let i=0;i<response.data.numberOfVerses;i++){
                        audioEl.src = response.data.verses[i].audio.secondary[0]
                        audioEl.controls = true
                        audioEl.style = "display:none"
                        audioEl.play()                        
                }
            })

            for(let i=0;i<response.data.numberOfVerses;i++){
                let h2 = document.createElement('h2')
                let h4 = document.createElement('h4')
                let li = document.createElement('li')

                h2.textContent = response.data.verses[i].text.arab
                h4.textContent = translationUz.result[i].translation
                li.append(h2,h4)

                li.addEventListener('click',()=>{
                    audioEl.innerHTML = null
                    audioEl.src = response.data.verses[i].audio.primary
                    audioEl.controls = true
                    audioEl.style = "display:none"
                    audioEl.play()
                })
                
                ul.append(li)
            }

        })()      
    }    
})
        