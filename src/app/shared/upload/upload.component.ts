import { OnInit } from '@angular/core';

import { Component, ElementRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'upload-component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges {
    form: FormGroup;
    loading: boolean = false;
    method = 'POST';
    url = './server/upload/upload.php';
    images_url = 'http://localhost/aceventos2/src/app/images/';
    // @Output NgModuleCompileResult

@ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('preview') preview: ElementRef;

    @Output() status: EventEmitter<any> = new EventEmitter(true);
    @Input() img: string = '';

    constructor(private fb: FormBuilder) {

    }

    ngOnInit() {
        // this.setUpImage();
    }

    ngOnChanges() {

        this.setUpImage();
    }

    setUpImage() {
        var preview = this.preview.nativeElement;

        var image = new Image();
        image.height = 100;
        image.title = this.img;
        image.src = this.images_url + this.img;

        while (preview.hasChildNodes()) {
            preview.removeChild(preview.lastChild);
        }
        preview.appendChild(image);


    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];

            var reader = new FileReader();
            var preview = this.preview.nativeElement;

            reader.addEventListener("load", function () {
                var image = new Image();
                image.height = 100;
                image.title = file.name;
                image.src = this.result;
                while (preview.hasChildNodes()) {
                    preview.removeChild(preview.lastChild);
                }
                preview.appendChild(image);
            }, false);

            reader.readAsDataURL(file);
        }
    }

    private prepareSave(el): any {
        // console.log(el);
        let input = new FormData();
        input.append('images', el);
        return input;
    }

    forceSave() {
        this.onSubmit();
    }

    onSubmit() {

        if (this.fileInput.nativeElement.files[0] == undefined) {
            let percent = 100;

            setTimeout(() => {
                this.status.emit({
                    originalName: (this.img != null) ? this.img : '',
                    progress: {
                        percent: 100
                    },
                    status: 200
                });
                if (percent == 100) {
                    this.loading = false;
                }


            }, 0);
            return;
        }
        const formModel = this.prepareSave(this.fileInput.nativeElement.files[0]);

        // console.log(formModel);

        this.loading = true;
        // In a real-world app you'd have a http request / service call here like
        // this.http.post('apiUrl', formModel)
        // setTimeout(() => {
        // FormData cannot be inspected (see "Key difference"), hence no need to log it here
        //     console.log('done!');
        //     this.loading = false;
        // }, 1000);

        let xhr = new XMLHttpRequest();

        let uploadingFile = new UploadedFile(
            this.generateRandomIndex(),
            this.fileInput.nativeElement.files[0].name,
            this.fileInput.nativeElement.files[0].size
        );

        xhr.onload = () => {
            uploadingFile.onFinished(
                xhr.status,
                xhr.statusText,
                xhr.response
            );
            // this.removeFileFromQueue(queueIndex);
            st.emit(uploadingFile);
        }

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                let percent = Math.round(e.loaded / e.total * 100);
                uploadingFile.setProgres({
                    total: e.total,
                    loaded: e.loaded,
                    percent: percent
                });

                this.status.emit(uploadingFile);

                if (percent == 100) {
                    this.loading = false;
                }
            }
        }

        xhr.upload.onabort = (e) => {
            uploadingFile.setAbort();
            this.status.emit(uploadingFile);
            this.loading = false;
        }

        xhr.upload.onerror = (e) => {
            uploadingFile.setError();
            this.status.emit(uploadingFile);
            this.loading = false;
        }



        xhr.open(this.method, this.url, true);

        let st = this.status;
        xhr.onreadystatechange = () => {
            // if (xhr.readyState === XMLHttpRequest.DONE) {
            //     uploadingFile.onFinished(
            //         xhr.status,
            //         xhr.statusText,
            //         xhr.response
            //     );
            //     // this.removeFileFromQueue(queueIndex);
            //     st.emit(uploadingFile);
            // }
        }
        // xhr.withCredentials = this.withCredentials;

        // if (this.customHeaders) {
        //     Object.keys(this.customHeaders).forEach((key) => {
        //         xhr.setRequestHeader(key, this.customHeaders[key]);
        //     });
        // }

        // if (this.authToken) {
        //     xhr.setRequestHeader("Authorization", `${this.authTokenPrefix} ${this.authToken}`);
        // }

        xhr.send(formModel);
    }

    clearFile() {
        this.form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

    generateRandomIndex(): string {
        return Math.random().toString(36).substring(7);
    }
}

class UploadedFile {
    id: string;
    status: number;
    statusText: string;
    progress: Object;
    originalName: string;
    size: number;
    response: string;
    done: boolean;
    error: boolean;
    abort: boolean;

    constructor(id: string, originalName: string, size: number) {
        this.id = id;
        this.originalName = originalName;
        this.size = size;
        this.progress = {
            loaded: 0,
            total: 0,
            percent: 0
        };
        this.done = false;
        this.error = false;
        this.abort = false;
    }

    setProgres(progress: Object): void {
        this.progress = progress;
    }

    setError(): void {
        this.error = true;
        this.done = true;
    }

    setAbort(): void {
        this.abort = true;
        this.done = true;
    }

    onFinished(status: number, statusText: string, response: string): void {
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.done = true;
    }
}
