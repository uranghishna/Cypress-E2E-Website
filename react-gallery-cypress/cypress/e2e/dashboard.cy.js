describe("Dashboard Page Test Cases", () =>{
    it('Do Login with Correct values', () =>{
        cy.visit('http://localhost:3000')

        const email = cy.get('input[name="email"]').type('user@react.test')
        
        const password = cy.get('input[name="password"]').type('password')

        const button = cy.get("button")
        button.click()

        cy.on('window:alert', (text) =>{
            expect(text).to.contains('welcome')
        })

        cy.url().should("eq", "http://localhost:3000/dashboard")
    })

    it("Found No Post for the First Time", () =>{
        cy.contains("Found 0 photos")
    })

    it("Contains Image url and description input, and Publish button", () =>{
        const image = cy.get('input[name="image"]')
        image.should("be.visible")
        image.should("have.attr", "type", "url")
        image.should("have.attr", "placeholder", "Image URL")
        
        const description = cy.get('input[name="desc"]')
        description.should("be.visible")
        description.should("have.attr", "type", "text")
        description.should("have.attr", "placeholder", "What's on your mind?")

        const button = cy.get("button")
        button.should("be.visible")
        button.contains("Publish!")
        button.should("have.css", "background-color", "rgb(79, 70, 229)")
        button.should("have.css", "color", "rgb(255, 255, 255)")
    })

    it("Upload Some Photos", () =>{
        const photos = [
            {
                imageValue: "https://plus.unsplash.com/premium_photo-1664699099191-f67e1f4aef40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                descriptionValue: "Image 1 : Lorem 1"
            },
            {
                imageValue: "https://images.unsplash.com/photo-1682097306383-60da06089956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
                descriptionValue: "Image 2 : Lorem 2"
            }
        ]
        photos.forEach(({ imageValue, descriptionValue }) =>{
            const image = cy.get('input[name="image"]')
            image.type(imageValue)
            
            const description = cy.get('input[name="desc"]')
            description.type(descriptionValue)

            const button = cy.get("button")
            button.click()

            cy.get("img").should("have.attr", "src", imageValue)
            cy.contains(descriptionValue)
        })
        cy.contains(`Found ${photos.length} photos`)
    })
})