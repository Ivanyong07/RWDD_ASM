/*
=================================
* Filename : profile.js
* Date : 18/10/2026
* Author : (add your name)
* Description : Script of the Profile page (profile.html): cover, numbers, overview and badges
=================================
*/

let history = []
let achievement = []
let board = { list: [], me: null}
let activeTab = "overview";

async function loadRender(){
    [history, achievement, board] = await Promise
    
}