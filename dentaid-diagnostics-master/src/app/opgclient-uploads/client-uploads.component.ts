import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-client-uploads',
  templateUrl: './client-uploads.component.html',
  styleUrls: ['./client-uploads.component.scss']
})
export class ClientUploadsComponent implements OnInit {
  imageUrlList = [];
  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.db.list('/opgclient').valueChanges().subscribe(files => {
      files.forEach(file => {
        this.storage.ref(`/opgclient/${file['filename']}`).getDownloadURL().subscribe(url => {
          this.imageUrlList.push({filename: file['filename'], imageUrl: url});
        });
      });
      console.log(this.imageUrlList);
    });
  }

}
