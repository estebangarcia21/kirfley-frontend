import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react";
import { MeDocument, MeQuery } from "generated/graphql-types";
import { useSessionAuth } from "./use-session-auth";

describe("use session auth hook", () => {
    const TestComponent = () => {
        useSessionAuth();

        return <div>Authenticated</div>;
    };

    it("redirects the user to the index page if not logged in", async () => {
        const useRouter = jest.spyOn(require("next/router"), "useRouter");
        const routerReplace = jest.fn();

        useRouter.mockImplementation(() => ({
            replace: routerReplace,
        }));

        const mocks: MockedResponse<Record<string, any>>[] = [
            {
                request: {
                    query: MeDocument,
                },
                result: {
                    data: {
                        me: null,
                    } as MeQuery,
                },
            },
        ];

        render(
            <MockedProvider mocks={mocks}>
                <TestComponent />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(routerReplace).toHaveBeenCalledWith("/");
        });
    });
});