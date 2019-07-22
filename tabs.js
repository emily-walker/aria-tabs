window.addEventListener("DOMContentLoaded", function() {
    var allTabs = document.querySelectorAll('[role="tab"]');
    var tabList = document.querySelector('[role="tablist"]');

    allTabs.forEach(function (tab) {
        tab.addEventListener("click", selectNewTab);
    });

    var tabFocus = 0;

    tabList.addEventListener("keydown", function (e) {
        if (e.keyCode === 39) {
        var currentTab = allTabs[tabFocus]
        currentTab.setAttribute("tabindex", -1);
        tabFocus++;

        if (tabFocus >= allTabs.length) {
        tabFocus = 0;
        }
        
        currentTab.classList.remove("tab--inactive");
        currentTab.classList.add("tab--active");
        currentTab.setAttribute("tabindex", 0);
        currentTab.focus();
        }
    });
});
  
function selectNewTab(e) {
    var target = e.target;
    var targetParentNode = target.parentNode;
    var targetGrandparentNode = targetParentNode.parentNode;

    targetParentNode
        .querySelectorAll('[aria-selected="true"]')
        .forEach(function (tab) {
            tab.classList.remove("tab--active");
            tab.classList.add("tab--inactive");
            tab.setAttribute("aria-selected", false)
        });

    target.setAttribute("aria-selected", true);
    target.classList.remove("tab--inactive");
    target.classList.add("tab--active");

    targetGrandparentNode
        .querySelectorAll('[role="tabpanel"]')
        .forEach(function (p) {
            p.setAttribute("hidden", true);
        });

    targetGrandparentNode.parentNode
        .querySelector(`#${target.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
}