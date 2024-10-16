let intervalHandle = undefined;
let url = undefined;

const f = () => {
  let caseId = '';
  let accountName = '';
  let subject = '';
  const containerNode = document.createElement('div');

  const sectionHeader = document.getElementById('section_header');
  if (sectionHeader === null) {
    // lightning
    if (url === window.location.href) {
      return;
    }
    url = undefined;
    const flexPage = document.querySelector('one-record-home-flexipage2');
    if (flexPage === null) {
      console.log('wait for page ready - flexPage');
      return;
    }
    const text = flexPage.innerText;
    if (
      (text.match(/\nCase Number\n(.+?)\n/) === null &&
        text.match(/Show available actionsCase Number(.+?)Case Severity/) ===
          null) ||
      (text.match(/\nAccount Name\n(.+?)\n/) === null &&
        text.match(/Account Name(.+?)Edit Account Name/) === null) ||
      (text.match(/\nSubject\n(.+?)\n/) === null &&
        text.match(/Subject(.+?)Edit Subject/) === null)
    ) {
      console.log('wait for page ready - text');
      return;
    }
    caseId = (text.match(/\nCase Number\n(.+?)\n/) ||
      text.match(/Show available actionsCase Number(.+?)Case Severity/))[1];
    accountName = (text.match(/\nAccount Name\n(.+?)\n/) ||
      text.match(/Account Name(.+?)Edit Account Name/))[1];
    subject = (text.match(/\nSubject\n(.+?)\n/) ||
      text.match(/Subject(.+?)Edit Subject/))[1];
    flexPage.prepend(containerNode);
    url = window.location.href;
  } else {
    // classic
    clearInterval(intervalHandle);
    caseId = document
      .getElementsByTagName('title')[0]
      .text.match(/\d{6,10}/)[0];
    accountName = Array.from(document.getElementsByClassName('labelCol'))
      .filter(ele => ele.textContent.trim() === 'Account Name')[0]
      .nextSibling.textContent.trim();
    subject = Array.from(document.getElementsByClassName('labelCol'))
      .filter(ele => ele.textContent.trim() === 'Subject')[0]
      .nextSibling.textContent.trim();
    sectionHeader.parentNode.insertBefore(containerNode, sectionHeader);
  }

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('keyword', caseId);
  urlSearchParams.append(
    'teamName',
    `${accountName}: Case ${caseId} ${subject}`
  ); // Dolby Labs: Case 09681148 China/India GW solution pricing
  urlSearchParams.append(
    'sfTicketUri',
    window.location.origin + window.location.pathname
  );
  containerNode.innerHTML = `<iframe id="glip-iframe" frameBorder="0" width="100%" style="height: 24px;" src="https://ringcentral.github.io/chrome-extension-glip-salesforce/?${urlSearchParams.toString()}"></iframe>`;
};

intervalHandle = setInterval(() => f(), 1000);

window.addEventListener('message', event => {
  if (event.data.type === 'resize') {
    document.getElementById('glip-iframe').style.height =
      event.data.height + 'px';
  }
});
