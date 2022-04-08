import { Component, OnInit, Input, ViewChild, ElementRef, forwardRef } from "@angular/core";
import { BaseQuestionComponent } from "../base-question.component";

@Component({
    selector: "img-question",
    templateUrl: "./img-question.component.html",
    styleUrls: ["./img-question.component.scss"],
    providers: [
        {
            provide: BaseQuestionComponent,
            useExisting: forwardRef(() => ImgQuestionComponent)
        }
    ]
})
export class ImgQuestionComponent extends BaseQuestionComponent<any[]> implements OnInit {
    @Input() public question: string;
    @Input() public imgSrc: string;
    @Input() public imgWidth: string;
    @Input() public imgHeight: string;
    @Input() public nbCols: number;
    @Input() public nbRows: number;
    @ViewChild("grid", { read: ElementRef }) public grid: ElementRef;

    public rows = [];
    public columns = [];
    public gridElement: HTMLIonGridElement;
    public previouslySelectedBox = [-1, -1];

    private isDrawing = true;

    public ngOnInit() {
        super.ngOnInit();
        this.initAnswerIfNeeded();

        // Set grid on background image
        this.columns.length = this.nbCols;
        this.rows.length = this.nbRows;
    }

    public getStyles() {
        let styles = {
            "background-image": "url('" + this.imgSrc + "')",
            width: this.imgWidth,
            height: this.imgHeight
        };

        return styles;
    }

    public updateSelectedBoxes(event, isClick: boolean) {
        if (this.isEditable) {
            let rect = this.gridElement.getBoundingClientRect();
            let x = (isClick ? event.clientX : event.touches[0].clientX) - rect.left;
            let y = (isClick ? event.clientY : event.touches[0].clientY) - rect.top;

            let boxLength = this.gridElement.offsetWidth / this.nbCols;
            let boxHeight = this.gridElement.offsetHeight / this.nbRows;

            let boxX = Math.floor(x / boxLength);
            let boxY = Math.floor(y / boxHeight);

            if (boxX >= 0 && boxX <= this.nbCols - 1 && (boxY >= 0 && boxY <= this.nbRows - 1)) {
                let isPreviouslySelectedBox = boxX === this.previouslySelectedBox[0] && boxY === this.previouslySelectedBox[1];
                if (!(isPreviouslySelectedBox && !isClick)) {
                    let box = this.gridElement.children[0].children[boxY].children[boxX];
                    let index = this.answer.findIndex(b => b[0] === boxX && b[1] === boxY);

                    if (index === -1 && this.isDrawing) {
                        let newBox = [boxX, boxY];
                        this.answer.push(newBox);
                        box.classList.add("selectedBox");
                    } else if (index !== -1 && !this.isDrawing) {
                        this.answer.splice(index, 1);
                        box.classList.remove("selectedBox");
                    }

                    this.onChange(this.answer);
                }

                this.previouslySelectedBox[0] = boxX;
                this.previouslySelectedBox[1] = boxY;
            }
        }
    }

    public refreshDrawing() {
        this.previouslySelectedBox = [-1, -1];

        this.answer.forEach(boxCoordinates => {
            let box = this.gridElement.children[0].children[boxCoordinates[1]].children[boxCoordinates[0]];
            box.classList.remove("selectedBox");
        });

        this.answer = [];
        this.onChange(this.answer);
    }

    public toggleDrawing() {
        this.isDrawing = !this.isDrawing;
    }

    protected initAnswerIfNeeded() {
        if (this.answer == null) {
            this.answer = [];
        }

        this.drawGrid();
    }

    private drawGrid() {
        // Retrieve grid HTML element
        this.gridElement = this.grid.nativeElement as HTMLIonGridElement;

        this.answer.forEach(box => {
            this.gridElement.children[0].children[box[1]].children[box[0]].classList.add("selectedBox");
        });
    }
}
