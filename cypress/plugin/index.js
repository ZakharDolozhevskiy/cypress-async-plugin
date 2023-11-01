const reports = {}

function countNodes(element) {
    let count = 1; // Start with 1 for the current element

    if (element.childNodes.length > 0) {
        element.childNodes.forEach(child => {
            if (child.nodeType === 1) { // Check if it's an element node
                count += countNodes(child);
            }
        });
    }

    return count;
}

Cypress.Commands.add('startAsyncAnalysis', () => {
    cy.on('url:changed', (url) => {
        console.log('url:changed => ', url)

        cy.get('body', { log: false }).then(($element) => {
            cy.wrap(null).then(() => {
                new Cypress.Promise((resolve) =>  {
                    setTimeout(() => {
                        resolve()
                        reports[url] = countNodes($element[0])
                        console.log('url => ', url, ' -- report created')
                    }, 3000) // Emulate logic that check DOM and need some time to be completed
                })
            })
        })
    })
})

Cypress.Commands.add('stopAsyncAnalysis', () => {
    console.log('test passed. report: ')
    console.log(reports)
})