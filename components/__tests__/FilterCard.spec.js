import CardImage from '../FilterCard';
import React from 'react'
import renderer from 'react-test-renderer';

describe("FilterCard", () => {

    let tag;
    let tree;

    beforeAll(() => {
        tag = {
            "name": "oc_tober",
            "display_name": "OC_Tober",
            "followers": 1957,
            "total_items": 3,
            "following": false,
            "is_whitelisted": true,
            "background_hash": "LMSnSk9",
            "thumbnail_hash": null,
            "accent": "27BDBE",
            "background_is_animated": false,
            "thumbnail_is_animated": false,
            "is_promoted": false,
            "description": "Welcome to OC-Tober. Week 3: Nostalgia",
            "logo_hash": null,
            "logo_destination_url": null,
            "description_annotations": {}
        };
        tree = renderer
        .create(
            <CardImage
                tag={tag}
            />,
        ).toJSON();
    })

    it("Should have background Image", () => {
        expect(tree.children[0].props.source.uri).toBe(`https://i.imgur.com/${tag.background_hash}.png`)
    });

    it("Should have Tag name", () => {
        expect(tree.children[1].children[0]).toBe(tag.name);
    })
})