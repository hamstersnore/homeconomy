import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    templateUrl: './homeconomy-button.html',
    selector: 'homeconomy-button',
    imports: [RouterLink]
})
export class HomeconomyButton {
    text = input<string>("button text")
    link = input<string>("/placeholder")
}