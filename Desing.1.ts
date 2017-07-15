//things take care
//1.activations should fall back to lifeline if the movement is within the limit
//2.you could bring any svg element to front by rendering it at teh last, would need design changes
//all figures will have unique id, so that they could be referenced from other figures
//3.while storing figures all the figure references in would be replaced by their unique id

namespace UmlLight {

    class Store {
        umlFigures: UmlFigure[] = [];
        selectedFigures: UmlFigure[] = [];
        currentSelection: string;//currently selected object in tool
        selectedBoxGuide: Guide;
        selectedMessageGuide: MessageGuide;
        mouseClickedPos: Position;
        copiedFigures: UmlFigure[];
        mouseDown: boolean = false;
        cntrlDown: boolean = false;
        rightClickEntries: string[];
        //this will hold all the groups user selected
        groups: [UmlFigure[]];
        aboutTobeConnectedActivation: { activation: Activation, position: Position, message: Message };
        //the kind of data that is common for all the figures present in the store
        setup: SetUp;

    }
    class SetUp {
        cellSize: number;

    }
    //different actions that are allowed
    const ACTION_FIGURE_SELECT: string = "FIGURE_SELECTED";
    const ACTION_BOX_GUIDE_SELECT: string = "BOX_GUIDE_SELECTED";
    const ACTION_MESSAGE_GUIDE_SELECT: string = "BOX_GUIDE_SELECTED";
    const ACTION_MOUSE_MOVE: string = "MOUSE_MOVE";
    const ACTION_SET_MOUSE_POS: string = "SET_MOUSE_POS";
    const ACTION_RELEASE_SELECTION: string = "RELEASE_SELECTION"
    const ACTION_MOUSE_DOWN: string = "MOUSE_DOWN"
    const ACTION_MOUSE_UP: string = "MOUSE_UP"
    const ACTION_CNTRL_DOWN: string = "CNTRL_DOWN";
    const ACTION_CNTRL_UP: string = "CNTRL_UP";
    const ACTION_DELETE: string = "DELETE";
    const ACTION_COPY: string = "COPY";
    const ACTION_PASTE: string = "PASTE";
    const ACTION_GROUP: string = "GROUP";
    const ACTION_UNGROUP: string = "UNGROUP";
    const TYPE_ACTIVATION: string = "ACTIVATION"
    const ACTION_RIGHT_CLICK: string = "RIGHT_CLICK"

    //constants to decide which one is currently selected
    const SELECTED_MESSAGE_GUIDE = "MESSAGE_GUIDE"
    const SELECTED_UMLFIGURE_GUIDE = "UMLFIGURE_GUIDE"
    const SELECTED_UMLFIGURE = "UMLFIGURE"
    const SELECTED_FIGURE_ICON = "FIGURE_ICOND"


    class StoreUpdateService {
        store: Store = new Store();
        grideService: GridService;
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
                    this.select(action.data.selectedFigure);
                    break;
                }
                case ACTION_BOX_GUIDE_SELECT: {
                    this.store.selectedBoxGuide = action.data.selectedGuide;
                    break;
                }
                case ACTION_MESSAGE_GUIDE_SELECT: {
                    this.store.selectedMessageGuide = action.data.selectedMessageGuide;
                    break;
                }
                case ACTION_MOUSE_DOWN: {
                    this.store.mouseDown = true;
                    //todo: populate the mouse click position
                    break;
                }
                case ACTION_DELETE: {
                    this.delete();
                    break;
                }
                case ACTION_COPY: {
                    this.copy();
                    break;
                }
                case ACTION_PASTE: {
                    this.paste();
                    break;
                }
                case ACTION_RIGHT_CLICK: {
                    this.paste();
                    break;
                }
                case ACTION_GROUP: {
                    this.group();
                    break;
                }
                case ACTION_UNGROUP: {
                    this.ungroup();
                    break;
                }
                case ACTION_MOUSE_UP: {
                    this.store.mouseDown = false;
                    //todo: if 'aboutTobeConnectedActivation' is not null, call the connect call in 'activation'
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
        delete() {
            //todo: go through the list of selected figures and take this out of store.figures list
        }
        copy() {
            //todo: go through the list of selected figures, create a deep copy 
            //todo: add the list of 'copied figures' store attribute
        }
        paste() {
            //todo:get the mouse clicked position from store
            this.store.mouseClickedPos;
            //todo: get the left most one from the copied the list and check the offset between this and 'mouse clicked' position
            //todo: move all the figures in the list through the computed 'offset'
        }
        group() {
            //todo: add all the selected figures to a single group
        }
        ungroup() {
            //todo: delete all the groups that has contains selected figures
        }
        rightClick() {
            //todo:if all the selected figures belong to any one the group, take out 'group' from store's 'right click entries'
            //todo: if none of them belong to a group take out 'ungroup' from the list
            //todo: the else condition is automatically handled, as both are present by default in the 'right click entries'
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
            //todo: go through the selected figures and check whether its part of any group, if so add those as well to the selectedFigures
            //toto: go through the selectedfigures and remove the duplicates which would have come as part of the groups
            //todo: if there are more than one entries, you need to hide guideboxes for figures, only moving is allowed , no scaling

        }
        onMouseMove(data: Data) {
            //todo: set the direction of the move by checking which out of x,y offset is greater, set the other to '0'
            //check whether movement belongs to guide
            switch (this.store.currentSelection) {

                // const SELECTED_MESSAGE_GUIDE="MESSAGE_GUIDE"
                // const SELECTED_UMLFIGURE_GUIDE="UMLFIGURE_GUIDE"
                // const SELECTED_UMLFIGURE="UMLFIGURE"
                // const SELECTED_FIGURE_ICON="FIGURE_ICOND"
                case SELECTED_MESSAGE_GUIDE: {
                    this.scaleMessage(data);
                    break;
                }
                case SELECTED_UMLFIGURE_GUIDE: {
                    this.scaleFigure(data);
                    break;
                }
                case SELECTED_UMLFIGURE: {
                    this.moveFigure(data, this.store.selectedFigures);
                    break;
                }
                case SELECTED_FIGURE_ICON: {
                    //todo:put the changes for moving icon
                    break;
                }
                default: {
                    //statements; 
                    break;
                }
            }
            if (this.store.selectedBoxGuide || this.store.selectedMessageGuide) {
                this.scaleFigure(data);
            }
            else {
                //move the figure

            }

        }
        scaleFigure(data: Data) {
            this.store.selectedBoxGuide[0].scale(this.store.selectedBoxGuide, data.offset);

        }

        scaleMessage(data: Data) {

            //todo:before going through the activations unlight the highlighted message if any
            this.store.aboutTobeConnectedActivation.message.highLight(false, this.store.selectedMessageGuide);
            //its message guide thats selected
            var message: Message = <Message>this.store.selectedFigures[0];
            message.movePos(this.store.selectedMessageGuide, data.mouseLocation);
            //check whether modified arrow is close to any of the 'activation' figures
            //todo:filter out activation figure from store figure list
            var activations: Activation[] = [];
            activations.forEach(activation => {
                //get the new position that would be connected to selcted activation figure
                var connectedPos: Position = this.grideService.isMessageClose(activation, data.mouseLocation);
                if (connectedPos) {
                    //this is to move to connected pos
                    message.movePos(this.store.selectedMessageGuide, connectedPos);
                    //true denotes highligh
                    //todo:get whether its start guide or end guide and pass accordingly
                    message.highLight(true, this.store.selectedMessageGuide);
                    //todo: populate aboutTobeConnectedActivation
                    //todo:break after all connections are made
                }
            })
        }

        moveFigure(data: Data, selectedFigures: UmlFigure[]) {
            selectedFigures.forEach(figure => {
                figure.move(data.offset);

            })
            //check whether any of the snapping grid of this figure coincides with snapping grids of any others
            //todo:only do snapping if 's' is pressed.
            this.handleSnapping(data);
        }


        handleSnapping(data: Data) {
            var selectedFigures = this.store.selectedFigures;
            var selectedSnaps: SelectedSnap[] = this.grideService.getClosestSnaps(selectedFigures);
            //todo: code for showing selected snap lines
            //todo: go through selected figures and move snapped amount
            var snappedOffset: Offset;
            selectedFigures.forEach(figure => {
                figure.move(snappedOffset);
            })

        }


    }

    class Action {
        type: string;
        data: Data;
    }
    class Data {
        selectedFigure: Figure;
        selectedGuide: Guide;
        selectedMessageGuide: MessageGuide;
        offset: Offset;
        mouseLocation: Position;
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

    interface Guidable {
        guideBox: GuideBox;

    }

    interface Snappable {
        snap: SnapLines;
    }




    class Figure {

        position: Position;//relatie position of the figure

        figureAttrs: FigureAttrs;
        selected: boolean;
        rotation: number;

        constructor(private parent: UmlFigure) {

        }

        move(offset: Offset) {
            //todo:move the figure x and y position

        }
        scale(guide: Guide, offset: Offset) {
            //todo:add the new offset to width and height
            //todo:move left and top based on the offset if guide seems to be the one on the left side.

        }
    }
    class Icon extends Figure {

    }
    class UmlFigure extends Figure {
        figureVertices: FigureVertex[] = [];//this would be in percentages, this would decide the actual shape of the figure which will be done in svg

    }
    class LifeLine extends UmlFigure implements Guidable, Snappable {
        snap: SnapLines;
        guideBox: GuideBox;//todo:this needs to be populated by the implementing figure
        lifeHead: LifeLineHead;
    }
    class LifeLineHead {
        //vertices that would paint the head of the lifeline, some of them would be absolute position and head depth doesnt change with figure height
        vertices: Position[];
    }

    class Activation extends UmlFigure implements Guidable {
        guideBox: GuideBox;//todo:this needs to be populated by the implementing figure

        outgoingMessages: ConnectedMessage[];
        incomingMessages: ConnectedMessage[];

        scale(guide: Guide, offset: Offset) {
            //todo:add the new offset  height

        }
        connectMessage(connectedPosition: Position, message: Message, isStart: boolean) {
            //todo:create a new 'ConnectMessage' and append to the corresponding to list
        }


    }

    class ConnectedMessage {
        connectionPoint: Position;
        message: Message;

    }

    interface SelectedSnap { figure: UmlFigure; snapLine: number; distance: number }
    class GridService {
        store: Store;

        getClosestSnaps(selectedFigures: UmlFigure[]): SelectedSnap[] {
            //todo:go through all other figures from the stores and get the snapping line for all those
            var allOtherSnaps: number[];
            var selectedSnaps: SelectedSnap[];
            selectedFigures.forEach(figure => {
                //todo:check whether figure is snappable by checking the type
                //todo: go through all the snap lines for this figures
                //todo: get the ones within the limit; probably there is no need to check the direction of movement here;
                //todo: add all those to the list 'snaps' list

            })
            //todo: sort snaps list and return the ones with lowest distance, there could be multiple
            var reducedSnaps: SelectedSnap[];
            return reducedSnaps;

        }
        getAllOtherSnapLines(figures: UmlFigure[]): number[] {
            //todo:go through all other figures from the stores and get the snapping line for all those
            return null;
        }

        isMessageClose(activation: Activation, position: Position): Position {
            //
            return new Position();
        }



    }

    class FigureVertex {
        position: Position;
    }
    class GuideBox extends Figure {
        //todo:implementing figure is not referred from here, as implementing figures would be fetched from selected figures of the store
        //todo: use the 'position' from 'Figure' base class, value for which would be populated form implementing class
        guides: Guide[];//todo:this would be standard set 
        visible: boolean;//decides whether this particular guide needs to be shown, for some figures all the guides might not be shown
    }
    class Guide {
        top: number//todo: this would be percentages populated by 'GuideBox'
        left: number//todo: this would be percentages populated by 'GuideBox'

    }
    class SnapLines {
        x: number[] = [];
        y: number[] = [];
    }

    class Message extends UmlFigure {
        messaeGuide: MessageGuide;//needed to control where the arrow goes
        startLifeLine: LifeLine;//probably this reference would be redudant when you think of the whole picture starting from getting it from database
        destLifeLine: LifeLine;
        startPos: Position;// todo: this needs to populated when initially all figures are loaded based on json entry in the database
        endPos: Position;
        constructor() {
            super(null);
        }

        highLight(status: boolean, selectedGuide: MessageGuide) {
            //todo:highlight/delight the position based on the status
            //todo: find whether its start or end guide and highlight it accordingly 
        }

        movePos(selectedGuide: MessageGuide, newPos: Position) {
            //this will called when start lifeline moves if its connected or when user decides to move it by clicking start 'guide'
            //todo: find whether its start or end guide and assign it accordingly to 'startpos' or endps
        }


    }

    class MessageGuide {
        guideLocation:GuideLocation;
        position: Position;//this gets passed along by the implementing 'Message'

    }

    enum GuideLocation {
        START,
        END
    }

    //this would require a equation for genrating a curve lined
    class SelfMessage extends Message {
        //todo:get an equation to generate a curved line using 'start' and 'end' position

    }


    class FigureAttrService {
        getAbsolutePosition(figure: UmlFigure, pos: Position): Position {
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
        //todo:location of png file
        imgUrl: string;
        //todo: is selected attribute from the parent would add additional class that would cause it to be transparent, its needed when one of the figures are selected


    }
    class IconPanel {
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
        iconPanel: IconPanel;
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
