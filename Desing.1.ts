namespace UmlLight {

    class Store {
        figures: Figure[] = [];
        selectedFiguresToMove: Figure[] = [];
        selectedGuide: Guide;
        mouseClickedPos: Position;
        mouseDown: boolean = false;
        cntrlDown: boolean = false;

        //the kind of data that is common for all the figures present in the store
        setup: SetUp;

    }
    class SetUp {
        cellSize: number;

    }
    const ACTION_FIGURE_SELECT: string = "FIGURE_SELECTED";
    const ACTION_GUIDE_SELECT: string = "GUIDE_SELECTED";
    const ACTION_MOUSE_MOVE: string = "MOUSE_MOVE";
    const ACTION_SET_MOUSE_POS: string = "SET_MOUSE_POS";
    const ACTION_RELEASE_SELECTION: string = "RELEASE_SELECTION"
    const ACTION_MOUSE_DOWN: string = "MOUSE_DOWN"
    const ACTION_MOUSE_UP: string = "MOUSE_UP"
    const ACTION_CNTRL_DOWN: string = "CNTRL_DOWN";
    const ACTION_CNTRL_UP: string = "CNTRL_UP";

    const TYPE_ACTIVATION: string = "Activation"



    class StoreUpdateService {
        store: Store = new Store();
        updateState(action: Action) {
            switch (action.type) {
                case ACTION_CNTRL_DOWN: {
                    this.store.cntrlDown = true;
                    break;
                }
                case ACTION_CNTRL_UP: {
                    this.store.cntrlDown = false;
                    break;
                }
                case ACTION_FIGURE_SELECT: {
                    this.select(action.data.target);
                    break;
                }
                case ACTION_GUIDE_SELECT: {
                    this.store.selectedGuide = action.data.target;
                    break;
                }
                case ACTION_MOUSE_DOWN: {
                    this.store.mouseDown = true;
                    //todo: populate the mouse click position
                    break;
                }
                case ACTION_MOUSE_UP: {
                    this.store.mouseDown = false;
                    break;
                }
                case ACTION_MOUSE_MOVE: {
                    //movement should be tracked only if its dragged with mouse down
                    if (this.store.mouseDown) {
                        var offset: Offset = this.getMovementOffset();
                        action.data.offset = offset;
                        this.onMouseMove(action.data);
                    }

                    //todo:set the offset from the point mouse was clicked earlier.
                    break;
                }
                case ACTION_SET_MOUSE_POS: {
                    this.store.mouseClickedPos = action.data.mouseLocation;
                    break;
                }
                default: {
                    //statements; 
                    break;
                }
            }
        }
        getMovementOffset(): Offset {
            return null;
        }
        select(target: any) {

            if (this.store.cntrlDown) {
                //todo:add to the list of selected figures of the store
            }
            else {
                //todo:a fresh list starting with the selected one
            }

        }
        onMouseMove(data: Data) {
            //move the figure
            this.moveFigure(data);
            //check whether any of the snapping grid of this figure coincides with snapping grids of any others

        }

        moveFigure(data:Data){
            //todo: set the direction of the move by checking which out of x,y offset is greater, set the other to '0'
            //check whether move is for scaling or normal move
            if (this.store.selectedGuide) {
                var selectedFig: Figure = this.store.selectedGuide.parent;
                selectedFig.scale(this.store.selectedGuide, data.offset);
            }
            else {
                var selectedFigures = this.store.selectedFiguresToMove;
                selectedFigures.forEach(figure => {
                    figure.move(data.offset);
                })
            }
        }

        checkFor




    }





    class Action {
        type: string;
        data: Data;
    }
    interface Data {
        target: any;

        offset?: Offset;
        mouseLocation?: Position;
    }

    class Offset {
        x: number;
        y: number;
    }
    class Canvas {

    }
    class Position {
        left: number;
        top: number;
        isPercentage: boolean;
    }
    class FigureAttrs {
        width: number;
        height: number;
        rotation: number;
    }
    class Figure {
        guides: Guide[] = [];// this would be in percentages
        figureVertices: FigureVertex[] = [];//this would be in percentages, this would decide the actual shape of the figure which will be done in svg
        position: Position;//relatie position of the figure
        snap:Snap;
        figureAttrs: FigureAttrs;
        selected: boolean;
        rotation: number;
       
        constructor(private parent:Figure) {

        }
        withinCatchmentArea(): boolean {
            return true;
        }
        move(offset: Offset) {
            //todo:code to snap to nearest half cell by using % to the direction it was moved
            
        }





        scale(guide: Guide, offset: Offset) {
            //todo:add the new offset to width and height
            //todo:move left and top based on the offset if guide seems to be the one on the left side.

        }
        setNewFigureAttrs(guide: Guide, offset: Offset) {

        }
        setNewPositionIfNeeded(guide: Guide, offset: Offset) {
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
    class Activation extends Figure {
        catchmentDist: number = 10;
        constructor(private figureAttrService: FigureAttrService) {
            super(null);
        }
        //this one is for self messages
        childActivations: Activation[];
        //highlight if needed when arrow messages are near
        highlight(message: Message, side: string, movingGuide: Guide): boolean {
            return false;

        }
        getPointOfImpact(message: Message, side: string): Position {

            return null;
        }


    }

    class FigureVertex {
        position: Position;
    }
    class Guide {
        parent: Figure;
        position: Position;
        visible: boolean;//decides whether this particular guide needs to be shown, for some figures all the guides might not be shown
    }
    class Snap{
        x:number[]=[];
        y:number[]=[];
    }

    class Message extends Figure {
        startLifeLine: LifeLine;
        destLifeLine: LifeLine;
        startPos: Position;
        destPos: Position;
        figureAttrService: FigureAttrService;
        constructor(source: LifeLine, destination: LifeLine, figureAttrService: FigureAttrService) {
            super(null);
            this.setMessageAttrs();
        }

        setMessageAttrs() {

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

        getDistance(source: Position, dest: Position): number {
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
        selectedToMove: Figure[] = [];
        selectedToScale: Guide;
        selectedFigureIcon: FigureIcon;
        canvasFigures: Figure[] = [];


        mouseDown(event: Event) {
            this.populatedHolders();

        }
        mouseMove(event: Event) {


        }
        checkImpact() {
        }
        checkMessageMoveImpact() {


        }
        mouseUp(event: Event) {
        }

        populatedHolders() {

        }
    }

    class RefreshStoreService {
        refresh(figures: Figure[]) {

        }
    }


}
