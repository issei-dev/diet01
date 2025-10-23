// ログイン処理
function login() {
    const inputId = document.getElementById('member-id').value;
    const inputPw = document.getElementById('member-pw').value;
    const messageElement = document.getElementById('message');
    
    // JSONファイルからデータを読み込む
    fetch('members.json')
        .then(response => response.json())
        .then(members => {
            // 入力されたIDとパスワードに一致する会員を探す
            const member = members.find(m => m.id === inputId && m.password === inputPw);

            if (member) {
                // 認証成功
                messageElement.textContent = '';
                displayMemberInfo(member);
            } else {
                // 認証失敗
                messageElement.textContent = 'IDまたはパスワードが違います。';
            }
        })
        .catch(error => {
            console.error('データの読み込みエラー:', error);
            messageElement.textContent = 'エラーが発生しました。';
        });
}

// 会員情報を表示
function displayMemberInfo(member) {
    // フォームを非表示にし、情報エリアを表示
    document.getElementById('login-form').style.display = 'none';
    const infoDiv = document.getElementById('member-info');
    infoDiv.style.display = 'block';

    // 情報をHTMLに流し込む
    document.getElementById('info-name').textContent = member.name;
    document.getElementById('info-address').textContent = member.address;
    document.getElementById('info-extra').textContent = member.extraInfo;
    document.getElementById('info-image').src = member.imageUrl;
}

// ログアウト処理
function logout() {
    // フォームを表示し、情報エリアを非表示
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('member-info').style.display = 'none';

    // フォームをリセット
    document.getElementById('member-id').value = '';
    document.getElementById('member-pw').value = '';
    document.getElementById('message').textContent = 'ログアウトしました。';
}
