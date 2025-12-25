import 'dart:ui';
import 'package:flutter/material.dart';

class GlassAppBar extends StatelessWidget implements PreferredSizeWidget {
  const GlassAppBar({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(80);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          height: preferredSize.height + MediaQuery.of(context).padding.top,
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.05),
            border: Border(
              bottom: BorderSide(color: Colors.white.withOpacity(0.1)),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      padding: const EdgeInsets.all(8),
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [Color(0xFFFFD700), Color(0xFFEAB308)],
                        ),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.king_bed, color: Colors.black, size: 20),
                    ),
                    const SizedBox(width: 12),
                    RichText(
                      text: const TextSpan(
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                        children: [
                          TextSpan(text: "King ", style: TextStyle(color: Colors.white)),
                          TextSpan(text: "Saver", style: TextStyle(color: Color(0xFFFFD700))),
                        ],
                      ),
                    ),
                  ],
                ),
                IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.bar_chart_rounded, color: Colors.grey),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
