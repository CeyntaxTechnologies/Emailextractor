chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: () => {
      const bodyText = document.body.innerText;
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/gi;
      const emails = bodyText.match(emailRegex) || [];
      return [...new Set(emails)];
    }
  }, (results) => {
    const emailList = document.getElementById("emailList");
    const emails = results[0].result;
    emails.forEach(email => {
      const li = document.createElement("li");
      li.textContent = email;
      emailList.appendChild(li);
    });
  });
});
