
var sectionedContentComponent = {
    // return the main container element
    getSections: function() {
        return document.querySelector('.sections');
    },

    // remove an element by node reference
    eleRemoveFromDom: function(ele) {
        if(ele) {
            ele.parentNode.removeChild(ele);
        }
    },

    // modify the DOM for tab menu structure at larger viewport widths
    buildTabs: function(eleSections) {
        var elesContentSections = eleSections.querySelectorAll('section');
        var eleList = document.createElement('ul');

        eleList.classList.add('tabs-list');
        eleList.setAttribute('role', 'tablist');

        elesContentSections.forEach(function(section, i) {

            // get existing data
            var tabsHeading = section.querySelector('h2');
            var tabsTitle = tabsHeading.textContent;

            // create new elements
            var eleListItem = document.createElement('li');
            var eleAnchor = document.createElement('a');

            // add new element attributes
            tabsHeading.id = 'panel-title-' + i;

            eleListItem.setAttribute('role', 'presentation');

            eleAnchor.setAttribute('role', 'tab');
            eleAnchor.id = 'tab-' + i;
            eleAnchor.href = '#panel-title-' + i;
            eleAnchor.textContent = tabsTitle;

            // update the tab panel attributes
            section.classList.add('tab-panel');
            section.setAttribute('role', 'tabpanel');
            section.setAttribute('aria-labelledby', 'tab-' + i);

            // first section set as open, others closed
            if(i === 0) {
                eleListItem.classList.add('active');

                eleAnchor.setAttribute('aria-selected', 'true');

                section.setAttribute('aria-hidden', 'false');
                section.style.display = 'block';
            } else {
                eleAnchor.setAttribute('aria-selected', 'false');

                section.setAttribute('aria-hidden', 'true');
                section.style.display = 'none';
            }

            // assemble tabs list items
            eleListItem.insertAdjacentElement('afterbegin', eleAnchor);
            eleList.insertAdjacentElement('beforeend', eleListItem);
        });

        // append the new navigation tabs
        eleSections.insertAdjacentElement('afterbegin', eleList);
    },

    // add event handlers for tabs
    bindTabsEvents: function(eleSections) {
        var $_ = this;
        var elesAnchorsTabsList = eleSections.querySelectorAll('.tabs-list a');

        if(elesAnchorsTabsList.length) {
            elesAnchorsTabsList.forEach(function(eleAnchor) {
                eleAnchor.sectionsRef = eleSections;
                eleAnchor.addEventListener('click', $_.changePanelView);
            });
        }
    },

    // switch active panel
    changePanelView: function(e) {
        var eleThisAnchor = e.target;
        var eleSections = e.currentTarget.sectionsRef;
        var elesAnchorsTabsList = eleSections.querySelectorAll('.tabs-list a');
        var elesSections = eleSections.querySelectorAll('section');

        // reset the tabs list anchors
        elesAnchorsTabsList.forEach(function(eleAnchor) {
            eleAnchor.setAttribute('aria-selected', 'false');
            eleAnchor.parentNode.classList.remove('active');
        });

        // set the current selected tabs list anchor
        eleThisAnchor.setAttribute('aria-selected', 'true');
        eleThisAnchor.parentNode.classList.add('active');

        // reset the tab panels visibility
        elesSections.forEach(function(eleSection) {
            eleSection.setAttribute('aria-hidden', 'true');
            eleSection.style.display = 'none';

            // show the selected tabs panel
            if(eleSection.getAttribute('aria-labelledby') === eleThisAnchor.id) {
                eleSection.setAttribute('aria-hidden', 'false');
                eleSection.style.display = 'block';
            }
        });

        e.preventDefault();
    },

    // modify the DOM to remove the tab menu structure at smaller viewport widths 
    removeTabs: function(eleSections) {
        var $_ = this;
        var eleTabsList = eleSections.querySelector('.tabs-list');
        var elesSections = eleSections.querySelectorAll('section');

        $_.eleRemoveFromDom(eleTabsList);

        elesSections.forEach(function(section) {
            while(section.attributes.length > 0) {
                section.removeAttribute(section.attributes[0].name);
            }
        });
    },

    init: function() {
        var $_ = this;
        var eleSections = $_.getSections();
        var mql = window.matchMedia('(min-width: 480px)');

        if(eleSections) {
            // viewport handling
            if(mql.matches) {
                eleSections.classList.add('tabs');

                // build tabs structure
                $_.buildTabs(eleSections);
                $_.bindTabsEvents(eleSections);
            }
            else {
                eleSections.classList.add('accordion');

                // ToDo: build of possible accordion structure
            }

            window.onresize = function() {
                if(mql.matches) {
                    eleSections.classList.remove('accordion');
                    eleSections.classList.add('tabs');

                    // ToDo: removal of possible accordion structure

                    // build tabs structure
                    if (!document.querySelector('.tabs-list')) {
                        $_.buildTabs(eleSections);
                        $_.bindTabsEvents(eleSections);
                    }
                }
                else {
                    eleSections.classList.remove('tabs');
                    eleSections.classList.add('accordion');

                    // remove tabs structure
                    if (document.querySelector('.tabs-list')) {
                        $_.removeTabs(eleSections);
                    }

                    // ToDo: possible build of accordion structure
                }
            };
        }
    }
};

window.addEventListener('DOMContentLoaded', function() {
    sectionedContentComponent.init();
});

