@Configuration
class SpringConfiguration : WebMvcConfigurer {
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        serveDirectory(registry, "/ui", "classpath:/ui/")
    }
    private fun serveDirectory(registry: ResourceHandlerRegistry, endpoint: String, location: String) {
        val baseEndpoint = endpoint.trimEnd('/')
        val endpointPatterns = listOf(
            baseEndpoint,
            “$baseEndpoint/”,
        "$baseEndpoint/**"
        ).toTypedArray()
        registry.addResourceHandler(*endpointPatterns)
            .addResourceLocations("${location.trimEnd('/')}/")
            .resourceChain(false)
            .addResolver(CustomPathResourceResolver())
    }
}
class CustomPathResourceResolver : PathResourceResolver() {
    override fun resolveResource(
        request: HttpServletRequest?,
        requestPath: String,
        locations: MutableList<out Resource>,
        chain: ResourceResolverChain
    ): Resource? {
        return super.resolveResource(request, requestPath, locations, chain)
            ?: super.resolveResource(request, "/index.html", locations, chain)
    }
}