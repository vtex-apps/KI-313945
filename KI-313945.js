$(document).ready(function () {
  let listenerCreated = false;
  const observerReceiverName = new MutationObserver((mutations, obsP) => {
    const receiverName = document.querySelector(".ship-receiverName");
    if (document.contains(receiverName)) {
      if (!listenerCreated) {
        listenerCreated = true;
        createListener(listenerCreated);
      }
    } else {
      listenerCreated = false;
    }
  });

  observerReceiverName.observe(document, {
    childList: true,
    subtree: true,
  });
});

function createListener(listenerFlag) {
  if (listenerFlag) {
    document
      .querySelector("#ship-receiverName")
      .addEventListener("focusout", (event) => {
        vtexjs.checkout.getOrderForm().then(function (orderForm) {
          var shippingData = orderForm.shippingData;
          if (
            shippingData.selectedAddresses &&
            shippingData.selectedAddresses.length > 0
          ) {
            shippingData.selectedAddresses[0].receiverName =
              document.querySelector("#ship-receiverName").value;
            return vtexjs.checkout.sendAttachment("shippingData", shippingData);
          }
        });
      });
  }
}
