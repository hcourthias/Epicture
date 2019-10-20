import CardImage from '../Card';
import React from 'react'
import renderer from 'react-test-renderer';

describe('<CardImage>', () => {

    let image = null;
    let tree = null;

    beforeAll(() => {
        image = {
            "id": "mdki1Lt",
            "title": "Everybody's first kiss is awkward.....",
            "description": null,
            "datetime": 1571462653,
            "cover": "tt9mtCk",
            "cover_width": 960,
            "cover_height": 960,
            "account_url": "Dbonker",
            "account_id": 18202836,
            "privacy": "hidden",
            "layout": "blog",
            "views": 80297,
            "link": "https://imgur.com/a/mdki1Lt",
            "ups": 1620,
            "downs": 50,
            "points": 1570,
            "score": 1610,
            "is_album": true,
            "vote": null,
            "favorite": false,
            "nsfw": false,
            "section": "",
            "comment_count": 61,
            "favorite_count": 556,
            "topic": "No Topic",
            "topic_id": 29,
            "images_count": 1,
            "in_gallery": true,
            "is_ad": false,
            "tags": [
                {
                    "name": "cute",
                    "display_name": "cute",
                    "followers": 110309,
                    "total_items": 174000,
                    "following": false,
                    "is_whitelisted": false,
                    "background_hash": "MifWJps",
                    "thumbnail_hash": null,
                    "accent": "3BA3B1",
                    "background_is_animated": false,
                    "thumbnail_is_animated": false,
                    "is_promoted": false,
                    "description": "",
                    "logo_hash": null,
                    "logo_destination_url": null,
                    "description_annotations": {}
                },
                {
                    "name": "dog",
                    "display_name": "dog",
                    "followers": 1086582,
                    "total_items": 30628,
                    "following": false,
                    "is_whitelisted": false,
                    "background_hash": "59NSmVP",
                    "thumbnail_hash": null,
                    "accent": "008261",
                    "background_is_animated": false,
                    "thumbnail_is_animated": false,
                    "is_promoted": false,
                    "description": "human's best friend",
                    "logo_hash": null,
                    "logo_destination_url": null,
                    "description_annotations": {}
                },
                {
                    "name": "aww",
                    "display_name": "aww",
                    "followers": 1756999,
                    "total_items": 85492,
                    "following": false,
                    "is_whitelisted": false,
                    "background_hash": "avRBRpN",
                    "thumbnail_hash": null,
                    "accent": "60AEBB",
                    "background_is_animated": false,
                    "thumbnail_is_animated": false,
                    "is_promoted": false,
                    "description": "cute and adorable",
                    "logo_hash": null,
                    "logo_destination_url": null,
                    "description_annotations": {}
                },
                {
                    "name": "suckmytongue",
                    "display_name": "suckmytongue",
                    "followers": 2,
                    "total_items": 0,
                    "following": false,
                    "is_whitelisted": false,
                    "background_hash": "QL9pTeJ",
                    "thumbnail_hash": null,
                    "accent": "159559",
                    "background_is_animated": false,
                    "thumbnail_is_animated": false,
                    "is_promoted": false,
                    "description": "",
                    "logo_hash": null,
                    "logo_destination_url": null,
                    "description_annotations": {}
                }
            ],
            "ad_type": 0,
            "ad_url": "",
            "in_most_viral": true,
            "include_album_ads": false,
            "images": [
                {
                    "id": "tt9mtCk",
                    "title": null,
                    "description": null,
                    "datetime": 1571462608,
                    "type": "video/mp4",
                    "animated": true,
                    "width": 960,
                    "height": 960,
                    "size": 4228463,
                    "views": 391873,
                    "bandwidth": 1657020481199,
                    "vote": null,
                    "favorite": false,
                    "nsfw": null,
                    "section": null,
                    "account_url": null,
                    "account_id": null,
                    "is_ad": false,
                    "in_most_viral": false,
                    "has_sound": true,
                    "tags": [],
                    "ad_type": 0,
                    "ad_url": "",
                    "edited": "0",
                    "in_gallery": false,
                    "link": "https://i.imgur.com/tt9mtCk.mp4",
                    "mp4_size": 4228463,
                    "mp4": "https://i.imgur.com/tt9mtCk.mp4",
                    "gifv": "https://i.imgur.com/tt9mtCk.gifv",
                    "hls": "https://i.imgur.com/tt9mtCk.m3u8",
                    "processing": {
                        "status": "completed"
                    },
                    "comment_count": null,
                    "favorite_count": null,
                    "ups": null,
                    "downs": null,
                    "points": null,
                    "score": null
                }
            ],
            "ad_config": {
                "safeFlags": [
                    "album",
                    "in_gallery",
                    "sixth_mod_safe",
                    "onsfw_mod_safe",
                    "gallery"
                ],
                "highRiskFlags": [],
                "unsafeFlags": [],
                "showsAds": true
            }
        }
        tree = renderer
        .create(
            <CardImage
                image={image.images[0]}
                item={image}
            />,
        ).toJSON();
    });

    it('Correct Image URL', () => {
        expect(tree.children[1].children[0].props.source.uri).toBe(`https://i.imgur.com/${image.images[0].id}.gif`);
    });

    it('Correct Number of Upvotes', () => {
        expect(tree.children[2].children[0].children[0].children[1].children[0]).toBe(`${image.ups}`);
    });

    it('Correct Number of Downvotes', () => {
        expect(tree.children[2].children[0].children[1].children[1].children[0]).toBe(`${image.downs}`);
    });

    it("Should have Avatar Image", () => {
        expect(tree.children[0].children[0].children[0].props.source.uri).toBe(`https://imgur.com/user/${image.account_url}/avatar?maxwidth=290`);
    });
});
