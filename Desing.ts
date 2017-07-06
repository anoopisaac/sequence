namespace UmlLight {

    

    class Offset {
        x: number;
        y: number;
    }
    class Canvas {

    }
    class Position {
        left: number;
        top: number;
    }
    class FigureAttrs {
        width: number;
        height: number;
        rotation: number;
    }
    class Figure {
        guides: Guide[] = [];// this would be in percentages
        figureVertices:FigureVertex[] = [];//this would be in percentages, this would decide the actual shape of the figure which will be done in svg
        position: Position;
        figureAttrs: FigureAttrs;
        guideOn: boolean;
        rotation: number;
        constructor() {

        }
        scale(guide: Guide, offset: Offset) {

            //call setNewFigureAttrs to set new width and height based on offseted guide
            this.setNewFigureAttrs(guide, offset);
            //check whether left and top needs to be updated
            this.setNewPositionIfNeeded(guide, offset)
        }
        //this method will be called for both x guide,y guide and xy guide., for x guide, y will be zero but still will be executed.
        setNewFigureAttrs(guide: Guide, offset: Offset) {
            //getting width
            ///get absoulte position of  guide element in the other corner
            ///get the new width by by subtracting offset from absolute x value
            //get the height
            ///repeate teh same logic
        }
        setNewPositionIfNeeded(guide: Guide, offset: Offset) {
            //if the guide as left as zero or top as zero, it needs to set left top position, it shoud be same as event.x, event.y resp
        }
        move(offset: Offset) {
            //set left top of the component
        }

    }
    class LifeLine extends Figure {
        activations: Activation[];
        outgoingMessages: Message[];
        transform(guide: Guide) {
            //set the height and width of the figure, rest everything else should follow
        }

        getStartPosition(message: Message): Position {
            return null;
        }
        getEndPosition(message: Message): Position {
            return null;
        }

    }
    class Activation extends Figure{
        catchmentDist:number=10;
        constructor(private figureAttrService: FigureAttrService){
            super();
        }
        //this one is for self messages
        childActivations: Activation[];
        //highlight if needed when arrow messages are near
        highlight(message:Message,side:string,movingGuide:Guide):boolean{
            var pointOfImpact:Position=this.getPointOfImpact(message,side);
            //get the distance between end of vertex and point of Impact with Activation
            var distance=this.figureAttrService.getDistance(movingGuide,pointOfImpact);
            //check whether distance falls within catchment distance
            if(distance<=this.catchmentDist){
                //do the highlight
                return true;
            }
            return false;

        }
        getPointOfImpact(message:Message,side:string):Position{
            var rotation:number=message.rotation;
            //get absolute position of left side guide to get x location of the Activation figure
            var position:Position=this.figureAttrService.getAbsolutePosition(this,this.figureVertices[0])
            //get the intersection point by find 'Y' from doing sing theta?
            return position;
        }


    }
    
    class FigureVertex extends Position{
      
    }
    class Guide extends Position{

    
        visible: boolean;//decides whether this particular guide needs to be shown, for some figures all the guides might not be shown
    }

    class Message extends Figure {
        startLifeLine: LifeLine;
        destLifeLine: LifeLine;
        startPos: Position;
        destPos: Position;
        figureAttrService: FigureAttrService;
        constructor(source: LifeLine, destination: LifeLine, figureAttrService: FigureAttrService) {
            super();
            this.setMessageAttrs();
        }

        setMessageAttrs() {
            //first get abs position for both 
            var startAbsPos: Position = this.figureAttrService.getAbsolutePosition(this.startLifeLine, this.startPos);
            var destAbsPos: Position = this.figureAttrService.getAbsolutePosition(this.destLifeLine, this.destPos);
            // get figure attrs - height,width and rotation
            this.figureAttrs = this.figureAttrService.getFigureAttrs(startAbsPos, destAbsPos);
        }

        move(offset: Offset) {
            super.move(offset);
            this.setRotationAngle();
        }
        setRotationAngle() {
            //
        }
       
    }

    class SelfMessage extends Message {
        constructor(source: LifeLine, destination: LifeLine, figureAttrService: FigureAttrService) {
            super(source, destination, figureAttrService);
        }

    }


    class FigureAttrService {
        getAbsolutePosition(figure: Figure, pos: Position): Position {
            //traverse till the root component and find the abs location.It might be needed when message connect 2 components.
            return null;
        }
        getFigureAttrs(sourcePosition: Position, destPosition: Position): FigureAttrs {
            return null;
        }

        getDistance(source:Position,dest:Position):number{
            //this should be done taking into account the rotation of figure, using trignometry
            return null;
        }

    }

    //the code for panel , could go into different file


    class FigureIcon extends Figure {
        //location of png file
        imgUrl: string;
        //this attribute would add additional class that would cause it to be transparent, its needed when one of the figures are selected
        isSelected: boolean;

    }
    class FigurePanel {
        figureIcons: FigureIcon[];
        selectedFigureIcon: FigureIcon;
        mouseDown(event: Event) {
            //add the selected to selectedfigureicon

        }
        mouseMove(event: Event) {
            //move the selected icon by calling move on it and passing the offset
        }
        mouseUp(event: Event) {
            //make the selectedfigureicon NIL so that nothing shows up
        }
    }

    class UmlCanvas {

    }

    class Event {

    }


    // component that holds figure panel and the canvas where its drawn
    class UmlDesignTool {
        figurePanel: FigurePanel;
        umlCanvas: UmlCanvas;
        selectedToMove: Figure[] =[];
        selectedToScale:Guide;
        selectedFigureIcon:FigureIcon;
        canvasFigures:Figure[]=[];
        higlightedActivation:Activation;

        mouseDown(event: Event) {
            this.populatedHolders();

        }
        mouseMove(event: Event) {
            //call move on figure component in the list
            //call scale on selectedToScale

            //if selectedFigureIcon is not null
            ///if cordinates has crossed over to canvas
            ////add the corresponding figure to canvasFigures
            ////add to selectedToMove 
            ////usasssign it from selectedFigureIcon
            ///else
            ////call move on selectedFigureIcon

            this.checkImpact();


        }
        checkImpact(){
            //if target is 
        }
        checkMessageMoveImpact(){
            //checked whether selected guide for scale belongs to 'message' component
            //check the direction of th message by checking the angle and decide the side of impact
            //filter out the 'activation' that needs to invoked  based on the direction
            //call hightlight on the above filtered activation list by passsing along 'message' component and 'guide'


        }
        mouseUp(event: Event) {
            //make the selectedfigureicon NIL so that nothing shows up
            //
        }

        populatedHolders() {
            //add to the above list by checking the type of event target
            //if target is guide
            ///add parent figure to selectedToScale
            //if target is figure itself
            ///add to selectedToMove
            //if target is figureicon
            ///create a copy and assing it to selectedFigureIcon
        }
    }

    class RefreshStoreService {
        refresh(figures: Figure[]) {
            //traverse through the entire tree and retrieve the matching,
            //once the match is found, replace it with a new once copying over all the data using object assign,
            //the found attribute needs to matched neverthless whether its attribute or part of array, your logic as take of this
        }
    }


}
