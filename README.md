用Nodejs也可以輕鬆寫Arduino
==

環境設置
--
1.	安裝 [`nodejs`](https://nodejs.org/en/)
2.	安裝 [`Arduino`](https://www.arduino.cc/en/Main/Software)
3.	在命令視窗內執行 `npm i -g gulp`
4.  在命令視窗內執行 `npm i`
5.  電腦接上 `Arduino`

-	`npm i -g gulp` 會全域安裝 `Gulp`，就可使用 `gulp` 指令
-	`npm i` 會安裝本專案使用的開發套件
-   `gulp` 會編譯且開始執行


注意事項
--
1.	本範例使用 `socket.io` 來做為 `web`跟`Arduino`溝通的橋梁
2.	須在http環境下使用
3.	本範例使用[`johnny-five`](http://johnny-five.io/)這套`nodejs`套件來控制`Arduino`
4.  `src/` 資料夾內檔案會經過編譯壓縮到 `app/`資料夾內


-	`src/` 資料夾是開發用資料夾，所有的修改請在`src/` 資料夾這裡修改
-   更新儲存檔案時 `gulp` 會自動偵測檔案變動，自動更新到瀏覽器上
-   編譯失敗的話會直接停止 `gulp`，需要直接在命令視窗再次執行 `gulp`
-	`app/`資料夾內的檔案是經過編譯壓縮後的完成檔!!!

	
