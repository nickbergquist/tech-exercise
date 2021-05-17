describe('DOM elements', function() {
    describe('getSections()', function() {
        beforeEach(function(){
            document.querySelector('body').innerHTML += '<div class="sections"><section></section></div>';
        });
        
        afterEach(function(){
            const ele = document.querySelector('.sections');
            ele.parentNode.removeChild(ele);
        });
        
        it('should be defined', function() {
            expect(sectionedContentComponent.getSections()).to.not.be.undefined;
        });
        
        it('should return a HTML node', function() {
            const ele = sectionedContentComponent.getSections();
            expect(ele.should.be.instanceof(HTMLElement));
        });

        it('should return a HTML div', function() {
            const ele = sectionedContentComponent.getSections();
            expect(ele.nodeName).to.equal('DIV');
        });

        it('should return a HTML div having sections', function() {
            const ele = sectionedContentComponent.getSections();
            expect(ele.childNodes[0].nodeName).to.equal('SECTION');
        });
    });

    describe('eleRemoveFromDom()', function() {
        beforeEach(function(){
            document.querySelector('body').innerHTML += '<ul class="tabs-list"></ul>';
        });
        
        afterEach(function(){
            const ele = document.querySelector('.tabs-list');
            ele.parentNode.removeChild(ele);
        });

        it('should be defined', function() {
            expect(sectionedContentComponent.eleRemoveFromDom()).to.be.undefined;
        });
    });
});
