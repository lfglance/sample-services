#include <iostream>
#include <sstream>
#include <curlpp/cURLpp.hpp>
#include <curlpp/Easy.hpp>
#include <curlpp/Options.hpp>

int main(int argc, char* argv[]) {

    if (argc != 2) {
        std::cerr << "Usage: " << argv[0] << " <URL>" << std::endl;
        return 1;
    }

    // Initialize curlpp
    curlpp::Cleanup cleaner;

    try {
        // recommend https://comments.fs10xer.dev/api/v1/replay?url=https://fs10xer.dev/blog/printing-stupid-shit-pt-1/
        std::string url = argv[1];
        curlpp::Easy request;
        request.setOpt<curlpp::options::Url>(url);
        std::ostringstream response;
        curlpp::options::WriteStream ws(&response);
        request.setOpt(ws);
        request.perform();
        std::cout << response.str() << std::endl;
    } catch (curlpp::LogicError & e) {
        std::cerr << "LogicError: " << e.what() << std::endl;
    } catch (curlpp::RuntimeError & e) {
        std::cerr << "RuntimeError: " << e.what() << std::endl;
    }

    return 0;
}
