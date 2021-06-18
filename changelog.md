# PaperMod


## current

- Javascript: integrate dedicated html javascript in papermod.js
- Add optional extended script, footer, head
- Refactorise code and page builing :
  - introduce widget folder
  - create dedicated folder for footer, header
- Add optional icon on menu
- Extract social icon in asset and rewrote svg integration

## Intergrate Current Pull request

- https://github.com/geronimo-iia/hugo-PaperMod/pull/1
  From https://github.com/nikaera/hugo-PaperMod/tree/feat/show-canonical-link
  Add original published post link feature

- https://github.com/geronimo-iia/hugo-PaperMod/pull/2
  From https://github.com/HeroCC/hugo-PaperMod
  Separated the footer info into a new partial

##  Initial Pull request "js script"

https://github.com/adityatelange/hugo-PaperMod/pull/438#issue-670224640

- Javascript resources are loaded at the end of the document, inside a script.html rather than in the head section.
- Add js extended folder to have a quick solution for few line of js (as css extended folder)
- Add script_extended partial template when we have to include library like jquery when its needed
- Rewrote inner javascript in a dedicated papermod.js using buildin js feature of hugo. 